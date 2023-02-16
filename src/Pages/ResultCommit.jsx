import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserCommit } from "../api/callApi";

const ResultCommit = () => {
  const { userName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ownerName = searchParams.get("ownerName");
  const repoName = searchParams.get("repoName");
  const [listCommit, setListCommit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserCommit({
        ownerName: ownerName,
        repoName: repoName,
        author: userName,
      });
      console.log(res);

      setListCommit(res);
    };
    fetchData();
  }, [userName, ownerName, repoName]);

  return (
    <>
      <div className="py-[50px] px-[70px]">
        <p className="text-2xl font-bold mb-5">{`List commit of ${userName}`}</p>
        <ul className="list-disc">
          {listCommit &&
            listCommit.map((allInfo) => <li>{allInfo.commit.message}</li>)}
        </ul>
      </div>
    </>
  );
};

export default ResultCommit;
