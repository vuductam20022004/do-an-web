import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Box } from '@mui/material'


function AnhQuangCao() {
  return (
    <Box sx={{ width: '100%', position: 'relative', textAlign: 'center', height: '200px' }}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <Box sx={{ position: 'relative', height:180 }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuA3RQioMgD7NDJ-w6bPzOHDkMcMvZqKj8A&s" // Thay bằng đường dẫn ảnh của bạn
              alt="Global Cookpad Games 2024"
              style={{ width: '100%', height:'inherit', borderRadius: '10px' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#FF007F',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
                textAlign: 'center'
              }}
            >
            </Box>
          </Box>
        </SwiperSlide>

        {/* Thêm các SwiperSlide khác nếu cần */}
        <SwiperSlide>
          <Box sx={{ position: 'relative', height:180 }}>
            <img
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/hinh-anh-que-huong-viet-nam-19.jpg" // Đổi ảnh ở đây
              alt="Another Image"
              style={{ width: '100%', height:'inherit', borderRadius: '10px' }}
            />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ position: 'relative', height:180 }}>
            <img
              src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" // Đổi ảnh ở đây
              alt="Another Image"
              style={{ width: '100%', height:'inherit', borderRadius: '10px' }}
            />
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}

export default AnhQuangCao
