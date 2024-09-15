function Info() {
  const description =
    "Tromaville có một anh hùng mới quái dị. Kẻ báo thù độc hại được sinh ra khi cậu bé lau nhà Melvin Junko rơi vào thùng chất thải độc hại. Bây giờ những kẻ làm ác sẽ có rất nhiều để mất.";
  const maxLength = 60;
  const truncatedDescription =
    description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;

  const performers = [
    "Johnny Deep",
    "David Ginlona",
    "Victory Adam",
    "Cristiano Ronaldo",
  ];
  const max = 6;
  const limitedPerformers = performers.slice(0, 3);

  return (
    <>
      <div className="info w-[100%] h-[200px] px-2" style={{ backgroundColor: "#16161a" }}>
        <p
          className="text-center font-bold text-xl mb-2"
          style={{ color: "#dfdfdf" }} 
        >
          Ma Da
        </p>
        <div className="gap-5">
          <div>
            {limitedPerformers.map((performer, index) => {
              const shortName =
                performer.length > max
                  ? performer.substring(0, max) + "..."
                  : performer;
              return (
                <button
                  key={index}
                  className="border-1 bg-gray-800 mr-[4px] px-[7px] mt-1 rounded-lg"
                  style={{ color: "#dfdfdf" }}
                >
                  {shortName}
                </button>
              );
            })}
          </div>
        </div>
        <p
          className="w-40 mt-2 pb-2"
          style={{ color: "#dfdfdf", fontSize: "15px" }}
        >
          {truncatedDescription}
        </p>
      </div>
    </>
  );
}
export default Info;
