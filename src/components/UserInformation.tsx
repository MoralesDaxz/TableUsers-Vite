import { Result } from "../interfaces/users"
import { Dispatch, SetStateAction } from "react";
import iconX from '../assets/iconX.svg'
type Props = {
    userInfo: Result[],
    setModal: Dispatch<SetStateAction<boolean>>
}
const UserInformation = ({ userInfo, setModal }: Props) => {
    return (
        <div className="w-full min-h-screen absolute flex flex-col items-center bg-[#000000c0]">
            <img
                src={iconX}
                width={40}
                height={40}
                onClick={() => setModal(false)}
                className="cursor-pointer text-4xl absolute right-[2%] top-1"
                alt="close" />

            <section className="w-[80%] md:w-[60%] mt-10 bg-[#0e5663f6] p-4 rounded-md">
                {userInfo?.map(info =>
                    <div className="grid grid-cols-4 gap-4" key={info.login?.salt}>
                        <div className="col-start-2 col-span-2 flex flex-col items-center" >
                            <img className="rounded-full" src={info.picture?.large} width={150} height={150} alt="user" />
                            <p className=" font-medium text-2xl md:text-3xl">{info.name?.first} {info.name?.last}</p>
                        </div>
                        <div className="col-start-1 col-span-2 flex flex-col items-start ">
                            <p className="font-bold text-xs md:text-base text-start">Gender: <span className="capitalize font-normal text-xs md:text-sm">{info.gender}</span></p>
                            <p className="font-bold text-xs md:text-base text-start">Age: <span className="capitalize font-normal text-xs md:text-sm">{info.dob?.age}</span></p>
                            <p className="font-bold text-xs md:text-base text-start">Phone: <span className="capitalize font-normal text-xs md:text-sm">{info.phone}</span></p>
                            <p className="font-bold text-xs md:text-base text-start">Email: <span className="capitalize font-normal text-xs md:text-sm">{info.email}</span></p>
                        </div>
                        <div className="col-start-3 col-span-2 flex flex-col items-start">
                            <p className="font-bold text-xs md:text-base text-start">Country: <span className="capitalize font-normal text-xs md:text-sm">{info.location?.country}</span></p>
                            <p className="font-bold text-xs md:text-base text-start">City: <span className="capitalize font-normal text-xs md:text-sm">{info.location?.city}</span></p>
                            <p className="font-bold text-xs md:text-base text-start">Street: <span className="capitalize font-normal text-xs md:text-sm">{info.location?.street?.name} {info.location?.street?.number}</span></p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
};
export { UserInformation };