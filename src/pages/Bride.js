import React, { useState } from 'react';
import data from '../assets/image_data.json';
import pinIcon from '../assets/location-pin.png';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../App.css';
import ImageModal from '../components/imageModal';
import AccountModal from '../components/accountModal';

function Bride() {
  // state for image modal
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  // state for account modal
  const [ clickedAccountData, setClickedAccountData ] = useState(null);
  const [ copiedAccount, setCopiedAccount ] = useState(null);

  const navermaps = useNavermaps()

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
  };
  const accountClick = (account_data) => {
    setClickedAccountData(account_data.data);
  };

  const handleRotationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = data.data[0].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };
  
  const handleRotationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = data.data[totalLength-1].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="">
      <div className='main container'>
        <div className="row justify-content-md-center">
          <div className="col col-md-2 col-lg-3">
          </div>

          <div className="col-md">
            <div className='mainsection'>
              <div>
                <img
                    src="https://dave-khim-aws-bucket-public.s3.ap-northeast-2.amazonaws.com/test/love-tenderness-couple-s-crossed-hands.jpg"
                    className='main-image' alt='t1'></img>
              </div>
              <div className='mainsection-text'>
                <div className='mainsection-text-1'>결혼식에 초대합니다</div>
                <div className='mainsection-text-2'>
                  백민우 <span className='text2-inner'> & </span> 박현아
                </div>
                <div className='mainsection-text-3'>2025. 02. 15 토요일 오전 11시 30분<br/>더클래스청담</div>
              </div>
            </div>
            <div className='invitation-section'>
              <div className='invitation-section-text1'>INVITATION</div>
              <div className='invitation-section-text2'>
                사랑은 소유가 아니라 동행임을 아는 두 사람은<br/>
                잡은 손을 놓지 않되 함부로 잡아끌지 않을 것이며<br/>
                서로의 두 눈을 고요히 바라보아<br/>
                말하지 않아도 같은 쪽으로 걸어가리라<br/>
                - 박미라, '아름다운 날에 부치다' 중에서 <br/>

                <br/>

                저희 두 사람 이제 믿음과 사랑으로 <br/>
                한 길을 가려 합니다.<br/>
                그 시작의 한 걸음, 함게 축복해 주시면 감사하겠습니다.<br/>

                <br/>

                신랑 백민우 · 신부 박현아

              </div>
              <div className='invitation-section-text3'>
                백상준・강영수<span className='text3-inner'>의 장남</span> 신랑
              </div>
              <div className='invitation-section-text3'>
                박연일・이민숙<span className='text3-inner'>의 장녀</span> 신부
              </div>
            </div>
            <div className='gallery-section'>
              <div className='gallery-section-text'>
                GALLERY
              </div>
            </div>
            <div>
              <div className='gallery-image-list-wrapper row'>
                {data.data.map((item, index) => (
                    <div key={index} className='col-4'>
                      <img className='gallery-image' src={item.thumb_image_link} alt={item.text}
                           onClick={() => handleClick(item, index)}/>
                    </div>
                ))}
              </div>
              {clickedImg && <ImageModal
                  clickedImg={clickedImg}
                  handleRotationRight={handleRotationRight}
                  handleRotationLeft={handleRotationLeft}
                  setClickedImg={setClickedImg}
              />}
            </div>
            <div className='location-section'>
              <div className='location-section-text1'>
                LOCATION
              </div>
            </div>
            <div className='location-map-section'>
              <MapDiv
                  style={{
                    width: '100%',
                    height: '350px'
                  }}
              >
                <NaverMap
                    defaultCenter={new navermaps.LatLng(37.5260774, 127.0422351)}
                    defaultZoom={16}>
                  <Marker
                      position={new navermaps.LatLng(37.5260774, 127.0422351)}
                      icon={
                        {
                          url: pinIcon,
                          size: new navermaps.Size(64, 64)
                        }
                      }/>
                </NaverMap>
              </MapDiv>
            </div>
            <div className='location-info-section'>
              <div className='location-info-section-text1'>더클래스청담</div>
              <div className='location-info-section-text2'>
                서울 강남구 압구정로60길 17-5<br/>
                서울 강남구 청담동 82-4<br/>
                Tel. 0507-1446-3638
              </div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>지하철</div>
              <div className='location-info-section-text2'>
                분당선 압구정로데오역 3번 출구 나와 직진<br/>
                → 지방시 매장 골목으로 우회전<br/>
                → 자딕앤볼테르 매장 지나고 나오는 좌측 작은 골목<br/>
                → 오르막길 20m 전방 좌측 더클래스청담 위치<br/>
              </div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>버스</div>
              <ol className='location-how-publictrans-section-list'>
                <li>청담초등학교 앞 하차 : 143, 240, 362, 4318, 4419</li>
                <li>일지아트홀 하차 : 9407, 9507, 145, 301, 342, 472, 4412</li>
              </ol>
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>자가용</div>
              <div className='location-how2-section-text2'>
                네비게이션 이용 시 “더클래스청담”을 입력하세요. (건물 앞에서 발레파킹)
              </div>
            </div>
            <div className='congratulatory-section'>
              <div className='congratulatory-section-text'>마음 전하실 곳</div>
              <div
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(groomAccountData)}>신랑측 계좌번호
              </div>
              <div
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(brideAccountData)}>신부측 계좌번호
              </div>
            </div>
            {clickedAccountData && <AccountModal
                clickedAccountData={clickedAccountData}
                setClickedAccountData={setClickedAccountData}
                copiedAccount={copiedAccount}
                setCopiedAccount={setCopiedAccount}
            />}
          </div>

          <div className="col col-md-2 col-lg-3">
          </div>
        </div>
      </div>
    </div>

  );
}

export default Bride;
