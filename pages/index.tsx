import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import {
  getBasedList,
  getLocationBasedList,
  getSearchList,
} from '@/core/api/axios'
import { returnTitle, getLocation } from '@/core/utils/mainPage'
import { TitleTag, CampingInfo, GpsData, SearchCamping } from '@/core/utils/types'
import {
  Header,
  CampingBoxGroup,
  Button,
  SelectBox,
  Footer,
} from '@/components/index'

export default function Home() {
  const [titleTag, setTitleTag] = useState<TitleTag>('nogps')
  const [CampingInfo, setCampingInfo] = useState<CampingInfo[] | null>(null)
  const [gpsData, setGpsData] = useState<GpsData>({ gpsRange: 10000, isGpsCheck: false })
  const pageNo = useRef(1)

  const [searchCamping, setSearchCamping] = useState<SearchCamping[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const searchKey = useRef('')

  const router = useRouter()

  useEffect(() => {
    getLocation(setGpsData)
  }, [])

  useEffect(() => {
    if (gpsData.isGpsCheck) {
      gpsData.lati && gpsData.long ? locationBasedList() : basedList()
    }
  }, [gpsData])

  // Header 검색 기능
  const changeSearchValue = useCallback(async ({ target }) => {
    if (target.value !== '') {
      const list = await getSearchList(1, target.value)
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
        searchList(1, target.value)
        setSearchCamping([])
        setIsSearching(false)
      } else {
        router.push(`/content/${contentId}?keyword=${facltNm}`)
      }
    },
    []
  )

  const handleClearSearchData = useCallback(() => {
    setSearchCamping([])
    setIsSearching(false)
  }, [])

  // API 기능 : basedList
  async function basedList(pageNo = 1) {
    const data = await getBasedList(pageNo)
    setTitleTag('nogps')
    // 요청받은 API는 없고 pageNo는 첫번째 페이지가 아닐때
    if (data?.length === 0 && pageNo !== 1) {
      alert('더보기 캠핑 목록이 없습니다.')
    } else if (data !== undefined) setCampingInfo([...CampingInfo, ...data])
  }

  // API 기능 : locationBasedList
  async function locationBasedList(pageNo = 1) {
    const gpsInfo = {
      mapX: gpsData.long,
      mapY: gpsData.lati,
      radius: gpsData.gpsRange,
    }

    const data = await getLocationBasedList(pageNo, gpsInfo)
    setTitleTag('gps')

    if (pageNo === 1) {
      setCampingInfo(data)
    } else if (data.length === 0 && pageNo !== 1) {
      alert('더보기 캠핑 목록이 없습니다.')
    } else setCampingInfo([...CampingInfo, ...data])
  }

  // API 기능 : searchList
  async function searchList(pageNo, value) {
    const list = await getSearchList(pageNo, value)
    setTitleTag('searchKey')

    searchKey.current = value
    // Todo : 검색이 좀 더 빠를때 searchCamping 수정이 안된다. (useEffect로 처리할 필요 있다.)
    setSearchCamping([])

    if (pageNo === 1) {
      setCampingInfo(list)
    } else if (list.length === 0 && pageNo !== 1) {
      alert('더보기 캠핑 목록이 없습니다.')
    } else setCampingInfo([...CampingInfo, ...list])
  }

  // 더보기 기능
  const clickBtn = () => {
    pageNo.current++

    switch (titleTag) {
      case 'nogps':
        basedList(pageNo.current)
        break
      case 'gps':
        locationBasedList(pageNo.current)
        break
      case 'searchKey':
        searchList(pageNo.current, searchKey.current)
        break
      default:
        alert(`더보기 기능에 문제가 발생했습니다.`)
        pageNo.current--
        break
    }
  }

  // GPS 범위 기능
  const handleChangeOptions = ({ target }) => {
    const newGpsRange = parseInt(target.value) * 1000
    setGpsData((data) => ({ ...data, gpsRange: newGpsRange }))
    pageNo.current = 1
    locationBasedList(pageNo.current)
  }

  return (
    <>
      <Header
        isInputExist={true}
        searchCamping={searchCamping}
        changeInputValue={changeSearchValue}
        checkSearchPressEnter={checkSearchPressEnter}
        handleClearSearchData={handleClearSearchData}
        isSearching={isSearching}
      />
      <Body id="backgroundLightGray">
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
          <CampingBoxGroup CampingInfo={CampingInfo || []} isHoverActive={!isSearching} />
          {!!CampingInfo ? (
            <Button
              id={'backgroundLightMainColor'}
              width={30}
              height={60}
              marginH={20}
              btnText={'더보기'}
              clickBtn={clickBtn}
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
