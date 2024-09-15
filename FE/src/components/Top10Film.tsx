import { StarFilled } from "@ant-design/icons";

function Top10() {
    const nameFilm = "Deadpool và Wolverine";
    const max = 6;
    const subName = nameFilm.length > max ? nameFilm.substring(0, max) + "..." : nameFilm;
  return (
    <>
      <aside className="w-[192px]">
        <div className="top_10 flex gap-3 items-center">
          <img
            src="https://cinema.momocdn.net/img/11560189508231871-Untitled-1.jpg"
            width={'80px'}
          />
          <div>
            <button
              className="border-1 w-[30px] border-red-500 bg-red-500 rounded-md"
              style={{ fontSize: "14px", color: "white", fontWeight: "bold" }}
            >
              18+
            </button>
            <p
              className="text-white mt-1 font-medium"
              style={{ fontSize: "18px" }}
            >
              {subName}
            </p>
            <p className="text-gray-200" style={{ fontSize: "14px" }}>
              Hành động
            </p>
            <StarFilled style={{ color: "gold" }} />{" "}
            <span className="text-gray-200" style={{ fontSize: "14px" }}>
              9.6
            </span>
          </div>
        </div>
        <hr className="border-1 mt-3" />
      </aside>
    </>
  );
}
export default Top10;
