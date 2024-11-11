
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Trang không tìm thấy</h2>
      <p className="mt-2">
        Xin lỗi, trang bạn tìm kiếm không tồn tại.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Quay lại Trang Chủ
      </a>
    </div>
  );
};

export default NotFound;
