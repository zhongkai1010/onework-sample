import { DEVELOPMENT_LANGUAGE } from '@/lib/constant'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'

const SelectLanguage = () => {
  const [selectLanguage, setSelectLanguage] = useState(DEVELOPMENT_LANGUAGE[0])
  const [languages, setLanguages] = useState(DEVELOPMENT_LANGUAGE)
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (value) {
          setLanguages(
            DEVELOPMENT_LANGUAGE.filter((language) =>
              language.toLowerCase().includes(value.toLowerCase())
            )
          )
        } else {
          setLanguages(DEVELOPMENT_LANGUAGE)
        }
      }, 500),
    []
  )

  // 包一层 useCallback 保持引用稳定
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch]
  )

  useEffect(() => {
    if (open) {
      setKeyword('')
      setSelectLanguage(DEVELOPMENT_LANGUAGE[0])
      setLanguages(DEVELOPMENT_LANGUAGE)
    }
  }, [open])

  return (
    <Popover
      open={open}
      placement="bottomLeft"
      styles={{
        body: {
          padding: 0,
        },
      }}
      arrow={false}
      trigger="click"
      content={
        <div className="w-[180]">
          <input
            type="search"
            placeholder="筛选语言"
            value={keyword}
            onChange={handleChange}
            className="w-full border-x-0 border-t-0 border-b-1 border-b-[#e4e6eb] p-2 hover:border-b-[#e4e6eb] focus:border-b-[#e4e6eb] focus:outline-none"
          />
          <div className="scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#fff] h-[300] overflow-x-hidden overflow-y-auto">
            {languages.map((language) => (
              <div
                className="mb-1.5 flex w-[180] cursor-pointer flex-row items-center p-2 hover:bg-sky-200"
                key={language}
                onClick={() => {
                  setOpen(false)
                  setSelectLanguage(language)
                }}
              >
                {language}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div
        className="flex w-[180] cursor-pointer flex-row items-center justify-between bg-blue-100 pt-1 pr-2 pb-1 pl-2 text-sm text-blue-500"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <span>{selectLanguage}</span>
        {open ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </div>
    </Popover>
  )
}

export default SelectLanguage
