import logoSvg from "@/public/logo.svg";
import Image from "next/image";
import CategoryDropdownButton from '@/components/CategoryDropdownButton'
import SwitchLayoutButton from '@/components/SwitchLayoutButton'
import SwitchThemeButton from '@/components/SwitchThemeButton'

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col bg-[#f4f5f5]">
      <div className="flex h-[54] flex-row bg-[#ffffff] pr-[24] pl-[24]">
        <Image src={logoSvg} alt="" className="mr-[16]" />
        <div className="flex flex-row items-center justify-center">
          <a className="mr-[24] ml-[24] cursor-pointer text-base text-slate-400 hover:text-slate-300">
            课程
          </a>
          <a className="mr-[24] ml-[24] cursor-pointer text-base text-slate-400 hover:text-slate-300">
            APP
          </a>
          <a className="mr-[24] ml-[24] cursor-pointer text-base text-slate-400 hover:text-slate-300">
            会员
          </a>
        </div>
        <div className="ml-auto flex flex-row items-center justify-center">
          <CategoryDropdownButton />
          <SwitchLayoutButton />
          <SwitchThemeButton />
        </div>
      </div>
      <div className="h-[132] bg-[#1e80ff]">2</div>
      <div className="flex flex-1 flex-row bg-[#f4f5f5] p-[16]">
        <div className="w-[321] bg-[#ffff]">3</div>1
        <div className="mr-[16] ml-[16] flex-1 bg-[#ffff]">4</div>
        <div className="w-[321] bg-[#ffff]">5</div>
      </div>
    </div>
  );
}
