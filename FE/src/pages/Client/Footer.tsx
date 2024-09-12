const Footer = () => {
  return (
    <footer className="bg-black text-white px-9 grid lg:grid-cols-[70%_30%]  xl:grid-cols-[70%_30%]">
      {/*==================== footer menu ========================*/}
      <div className="p-5">
        <p className="w-full">
          <span className="font-bold">FlashMovies</span> - Xem phim Online miễn
          phí chất lượng cao với FHD Vietsub - thuyết minh - lồng tiếng.
          FlashMovies có nhiều thể loại phim phong phú, đặc sắc, nhiều bộ phim
          hay nhất, giao diện trực quan, thuận tiện, tốc độ tải nhanh, thường
          xuyên cập nhật các bộ phim mới.
        </p>
        <div className="sitemap py-3 text-center">
              <a className="px-3" href="">Home</a> |
              <a className="px-3" href="">Phim Bộ</a> |
              <a className="px-3" href="">Phim Lẻ</a> |
              <a className="px-3" href="">Phim Hoạt Hình</a> |
              <a className="px-3" href="">Tin tức</a>
        </div>
      </div>
      {/*==================== footer menu ========================*/}
      {/*====================== Quy định chính sách============= */}
      <div className="flex gap-8 bg-[#353535] justify-center p-5">
        <ul>
          <h3 className="mb-3">Quy định</h3>
          <li>
            <a href="">Điều khoản chung</a>
          </li>
          <li>
            <a href="">Chính sách riêng tư</a>
          </li>
        </ul>
        <ul>
          <h3 className="mb-3">Giới thiệu</h3>
          <li>
            <a href="">Trang chủ </a>
          </li>
          <li>
            <a href="">Facebook</a>
          </li>
        </ul>
      </div>
      {/*====================== Quy định chính sách============= */}
    </footer>
  );
};

export default Footer;
