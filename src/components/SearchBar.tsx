import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import Image from 'next/image';
import { CustomInput } from './CustomInput';
interface ISearchBar extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className ?: string;
  className2 ?: string;
  src?: string;
  placeholder: string
}
export const SearchBar: FC<ISearchBar> = ({ src, placeholder, className, className2 }) => {
  const handleSearch = () => {
  }

  return (
    <div className='flex border border-black'>
        {src && <Image src={src} alt="image not found" className={'mr-[12.5px] ml-[5px] ' + className} />}
      <CustomInput type="text" placeholder={placeholder} max = {0} min = {0} className={'text-black ' + className2}
        onChange={(e) => handleSearch()} isSearch = {true}/>

    </div>
  )
}

{/* <div style={{ position: "relative" }}>
      <CustomInput type = "text" fontsize='' letterSpacing='' lineHeight='' max={0} min={0} placeholder='search' pleft=''
      style={{ width: width, fontWeight: 400, fontSize: props.fontSize }}
        className="w-full h-10 text-sm font-normal font-primary border-[0.5px] border-borderColor pl-[12.5px] text-primary"
        onChange={(e) => handleSearch()}
        />
      <div style={{ position: "absolute", top: "12px"}} className='mr-[12.5px] pb-[23px] ml-[5px]'>
        {src && <Image src={src} alt="image not found" />}
      </div>
    </div> */}