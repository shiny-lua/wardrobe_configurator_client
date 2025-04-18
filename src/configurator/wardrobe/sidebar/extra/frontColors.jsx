import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react"
import { useState } from "react"

import ColorCard from "../../common/colorCard"
import Config from "../../../config"
import { useEffect } from "react"
import useDimensionStore from "../../zustand/dimensionStore"
import { GetTexture, GetallPlates } from "../../../../Functions-configurator/Function-configurator"
const baseUrl = import.meta.env.VITE_BACKEND_URL_img;
// const baseUrl = 'https://storage.googleapis.com/schrankdesign-uploads/textures/';
export default function BodyColors() {
  const frontColor = useDimensionStore.use.frontColor()
  const [tab_data, setTabData] =useState([])
  const [textureList, setTextureList] = useState([])
  const [farbenList, setFarbenList] = useState([])
  const [holzList, setHolzList] = useState([])
  const [holzdekor, setHolzdekor] = useState([])
  const [furnierList, setFurnierList] = useState([])
  const textureActive = useDimensionStore.use.textureActive()

  useEffect(() => {
    let temp = []
    if (frontColor.value.color) {
      temp.push({ label: "Farben", value: "color" })
    }
    if (frontColor.value.venner) {
      temp.push({ label: "Holz", value: "woodDecor"})
    }
    if (frontColor.value.wood) {
      temp.push({ label: "Holzdekor", value: "wood" })
    }
    if (frontColor.value.solid) {
      temp.push({ label: "Furnier", value: "special" })
    }
    setTabData(temp)
  }, [])

  useEffect(() => {
    const getTexture = async () => {
      const { data, error } = await GetTexture();
      if (data) {
        if ( textureActive.length > 0) {
          const filteredTextureList = data.data.filter((texture, index) => {
            return textureActive[index]
          })
          setTextureList(filteredTextureList)
        } else {
          setTextureList(data.data)
          
        }
      }
      if (error) {
        console.log(error?.message);
      }
    };
    const GetPlates = async () => {
      const { data, error } = await GetallPlates()
      if (data) {
        // console.log(data.data)
        // setTextureList(data.data)
        const farben = data.data.filter((item, index) => {
          return item.plate_sort === "Farben" && textureActive[index]
        })
        setFarbenList(farben)
        const holz = data.data.filter((item, index) => {
          return item.plate_sort === "Holz" && textureActive[index]
        })
        setHolzList(holz)
        const holzdek = data.data.filter((item, index) => {
          return item.plate_sort === "Holzdekor" && textureActive[index]
        })
        setHolzdekor(holzdek)
        const furnier = data.data.filter((item, index) => {
          return item.plate_sort === "Furnier" && textureActive[index]
        })
        setFurnierList(furnier)
      }
      if (error) {
        // setIsLoading(false)
        console.log(error?.message)
      }
    }
    GetPlates()
    // getTexture()
  }, [textureActive])

  const [activeTab, setActiveTab] = useState(
    frontColor.value.color ? "color"
      : frontColor.value.venner ? "woodDecor"
        : frontColor.value.wood ? "wood"
          : "special"
  )

  return (
    <Tabs value={activeTab} className="py-4">
      <TabsHeader
        className="bg-[#BDBCBC] h-[35px] p-0 mx-3 bg-opacity-100 rounded-[10px] border-[1px] border-black"
        indicatorProps={{
          className: "bg-[#36695C] h-[33px] rounded-[10px]",
        }}
      >
        {tab_data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            className="text-[#FFF] text-[16px]"
            onClick={() => setActiveTab(value)}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="mt-5">
        {frontColor.value.color && (
          <TabPanel key="color" value="color" className="py-1 px-0">
            {farbenList.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {farbenList.map((item, index) => (
                  <ColorCard
                    key={index}
                    name={item.name}
                    imageUrl={baseUrl + item.images[0]}
                    hoverImage={baseUrl + item.thumbnail}
                    type={Config.color.type.color}
                    textureId={item.texture_id}
                    category={Config.color.category.front}
                    bodyInfo={
                      {
                        name: item.name,
                        thickness: item.plate_thickness,
                        surface: item.surface_structure,
                        coating: item.coating,
                        thumbnail: baseUrl + item.images[0],
                        description: item.description
                      }
                    }
                />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
        {frontColor.value.venner && (
          <TabPanel
            key="woodDecor"
            value="woodDecor"
            className="py-1 px-0"
          >
            {holzList.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {holzList.map((item, index) => (
                  <ColorCard
                    key={index}
                    name={item.name}
                    imageUrl={baseUrl + item.images[0]}
                    hoverImage={baseUrl + item.thumbnail}
                    type={Config.color.type.venner}
                    textureId={item.texture_id}
                    category={Config.color.category.front}
                    bodyInfo={
                      {
                        name: item.name,
                        thickness: item.plate_thickness,
                        surface: item.surface_structure,
                        coating: item.coating,
                        thumbnail: baseUrl + item.images[0],
                        description: item.description
                      }
                    }
                />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
        {frontColor.value.wood && (
          <TabPanel key="wood" value="wood" className="py-1 px-0">
            {holzdekor.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {holzdekor.map((item, index) => (
                  <ColorCard
                      key={index}
                      name={item.name}
                      imageUrl={baseUrl + item.images[0]}
                      hoverImage={baseUrl + item.thumbnail}
                      type={Config.color.type.venner}
                      textureId={item.texture_id}
                      category={Config.color.category.front}
                      bodyInfo={
                        {
                          name: item.name,
                          thickness: item.plate_thickness,
                          surface: item.surface_structure,
                          coating: item.coating,
                          thumbnail: baseUrl + item.images[0],
                          description: item.description
                        }
                      }
                  />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
        {frontColor.value.solid && (
          <TabPanel
            key="special"
            value="special"
            className="py-1 px-0"
          >
            {furnierList.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {furnierList.map((item, index) => (
                  <ColorCard
                      key={index}
                      name={item.name}
                      imageUrl={baseUrl + item.images[0]}
                      hoverImage={baseUrl + item.thumbnail}
                      type={Config.color.type.venner}
                      textureId={item.texture_id}
                      category={Config.color.category.front}
                      bodyInfo={
                        {
                          name: item.name,
                          thickness: item.plate_thickness,
                          surface: item.surface_structure,
                          coating: item.coating,
                          thumbnail: baseUrl + item.images[0],
                          description: item.description
                        }
                      }
                  />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
      </TabsBody>
    </Tabs>
  )
}
