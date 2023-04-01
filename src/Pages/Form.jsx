import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../common/Input";
import { getListUser } from "../api/callApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateWallet } from "../common";

const Form = () => {
  const schema = yup.object().shape({
    ownerName: yup.string().required("Field is invalid"),
    repoName: yup.string().required("Field is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [listUser, setListUser] = useState();
  const [paramQueryGit, setParamQueryGit] = useState();

  const handleShowListUser = async (valueFields) => {
    setParamQueryGit({
      paramOwner: valueFields.ownerName,
      paramRepo: valueFields.repoName,
    });
    const payload = {
      ownerName: valueFields.ownerName,
      repoName: valueFields.repoName,
    };
    const res = await getListUser(payload);
    console.log(res);
    if (res.code !== 200) {
      alert(
        "Something went wrong! Please Please enter the correct Owner Name and Repo Name"
      );
    } else {
      setListUser(res.data);
    }
  };

  listUser && console.log(listUser);

  return (
    <>
      <div className="bg-blue-200 min-h-screen flex flex-col gap-[40px]">
        <div className="w-full mt-[50px]">
          <CreateWallet />
          <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
            MVP Challenge
            <p className="text-sm text-red-400 mt-2">
              *Note: The repository needs to be public
            </p>
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form onSubmit={handleSubmit(handleShowListUser)}>
              <Input
                label={"Owner Name"}
                id="owner"
                register={register("ownerName")}
                placeholder="Put in owner name of repo"
                message={errors?.ownerName?.message}
              />
              <Input
                label={"Repo name"}
                id="repo"
                register={register("repoName")}
                placeholder="Put in name of repo"
                message={errors?.repoName?.message}
              />
              <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center mb-[30px]">
          <div className="max-w-screen-lg flex flex-wrap gap-4 justify-between px-5">
            {listUser &&
              listUser.map((user, index) => (
                <Link
                  to={`/user/${user.userName}?ownerName=${paramQueryGit.paramOwner}&repoName=${paramQueryGit.paramRepo}`}
                  key={index}
                >
                  <button
                    className="px-4 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                    style={{
                      width: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.userName}
                  </button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
