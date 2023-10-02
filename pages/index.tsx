import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import {
  getBasedList,
  getLocationBasedList,
  getSearchList,
} from '@/core/api/axios'
import { returnTitle, getLocation } from '@/core/utils/mainPage'
import { TitleTag, CampingInfo, GpsData, SearchCamping } from '@/core/utils/types.d'
import {
  Header,
  CampingBoxGroup,
  Button,
  SelectBox,
  Footer,
} from '@/components/index'

export default function Home() {
  const [titleTag, setTitleTag] = useState<TitleTag>('nogps')
  const [campingInfo, setCampingInfo] = useState<CampingInfo[] | null>(null)
  const [gpsData, setGpsData] = useState<GpsData>({ gpsRange: 10000, isGpsCheck: false })
  const pageNo = useRef(1)

  const [searchCamping, setSearchCamping] = useState<SearchCamping[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const searchKey = useRef('')

  const router = useRouter()

  // updateCampingInfo, basedList, locationBasedList는 직접 실행 X -> useEffect에 의해 실행 
  const updateCampingInfo = useCallback((newCampingInfo: CampingInfo[], pageNo: number) => {
    if (!newCampingInfo.length && pageNo !== 1) {
      alert('더보기 캠핑 목록이 없습니다.')
      return
    }

    setCampingInfo((campingInfo) => {
      const updatedCampingInfo = pageNo === 1 ? newCampingInfo : [...campingInfo, ...newCampingInfo]
      return updatedCampingInfo
    })
  }, [])

  // API 기능 : basedList
  const basedList = useCallback(async () => {
    const newCampingInfo = await getBasedList(pageNo.current)
    setTitleTag('nogps')

    updateCampingInfo(newCampingInfo, pageNo.current)
  }, [updateCampingInfo])

  // API 기능 : locationBasedList
  const locationBasedList = useCallback(async (gpsData) => {
    const gpsInfo = {
      mapX: gpsData.long,
      mapY: gpsData.lati,
      radius: gpsData.gpsRange,
    }

    const newCampingInfo = await getLocationBasedList(pageNo.current, gpsInfo)
    setTitleTag('gps')
    updateCampingInfo(newCampingInfo, pageNo.current)
  }, [updateCampingInfo])

  // API 기능 : searchList
  const searchList = useCallback(async (value) => {
    const newCampingInfo = await getSearchList(pageNo.current, value)
    setTitleTag('searchKey')

    searchKey.current = value
    setSearchCamping([])

    updateCampingInfo(newCampingInfo, pageNo.current)
  }, [updateCampingInfo])

  useEffect(() => {
    getLocation(setGpsData)
  }, [])
  useEffect(() => {
    if (gpsData.isGpsCheck) {
      gpsData.lati && gpsData.long ? locationBasedList(gpsData) : basedList()
    }
  }, [gpsData, locationBasedList, basedList])

  // Header 검색 기능
  const changeSearchValue = useCallback(async ({ target }) => {
    if (target.value !== '') {
      pageNo.current = 1
      const list = await getSearchList(pageNo.current, target.value)
      const filterList = list.map(({ facltNm, contentId, mapX, mapY }) => ({
        facltNm,
        contentId,
        mapX,
        mapY,
      }))

      setIsSearching(true)
      setSearchCamping(filterList)
    } else {
      setIsSearching(false)
      setSearchCamping([])
    }
  }, [])

  const checkSearchPressEnter = useCallback(
    ({ target }, idx, facltNm, contentId) => {
      if (idx === -1) {
        pageNo.current = 1
        searchList(target.value)
        setSearchCamping([])
        setIsSearching(false)
      } else {
        router.push(`/content/${contentId}?keyword=${facltNm}`)
      }
    },
    [router, searchList]
  )

  const handleClearSearchData = useCallback(() => {
    setSearchCamping([])
    setIsSearching(false)
  }, [])

  // 더보기 기능
  const addCampingInfo = () => {
    pageNo.current++

    switch (titleTag) {
      case 'nogps':
        basedList()
        break
      case 'gps':
        locationBasedList(gpsData)
        break
      case 'searchKey':
        searchList(searchKey.current)
        break
      default:
        alert(`더보기 기능에 문제가 발생했습니다.`)
        break
    }
  }

  // GPS 범위 기능
  const handleChangeOptions = ({ target }) => {
    const newGpsRange = parseInt(target.value) * 1000
    setGpsData((data) => ({ ...data, gpsRange: newGpsRange }))
    pageNo.current = 1
  }

  return (
    <>
      <Header
        searchCamping={searchCamping}
        changeInputValue={changeSearchValue}
        checkSearchPressEnter={checkSearchPressEnter}
        handleClearSearchData={handleClearSearchData}
        isSearching={isSearching}
      />
      <Body className="background-light-gray">
        <Main>
          <Title>
            <TitleText>
              {returnTitle(titleTag, searchKey.current)}
            </TitleText>
            {titleTag === 'gps' && (
              <SelectBox
                placeholder={'범위 설정'}
                defaultValue={'10km'}
                options={['1km', '5km', '10km', '20km']}
                handleChangeOptions={handleChangeOptions}
              />
            )}
          </Title>
          <CampingBoxGroup campingInfo={campingInfo || []} isHoverActive={!isSearching} />
          {!!campingInfo ? (
            <Button
              id={'campingInfoAddBtn'}
              className={'background_light_main_color'}
              width={10}
              marginH={2}
              paddingH={2}
              btnText={'더보기'}
              clickBtn={addCampingInfo}
              fSize={1.5}
            ></Button>
          ) : (
            <div> 검색 결과가 없습니다. </div>
          )}
        </Main>
      </Body>
      <Footer />
    </>
  )
}

const TitleText = styled.div`
  margin: 20px;
  min-width: 150px;
`

const Body = styled.main`
  width: 100%;
  min-height: 100vh;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 22vw * 2);
  height: auto;
  margin: 0vw 22vw;
  align-items: center;
  @media (max-width: 400px) {
    width: calc(100vw - 5vw * 2);
    margin: 5vw;
  }
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
