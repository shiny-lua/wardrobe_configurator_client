import DropdownArrowMain from "../../../public/images/furniture_configurator/dropdown-arrow-main.png";
import DropdownCloseIcon from "../../../public/images/furniture_configurator/dropdown-close-icon.png";
import DrawerTest from "../../../public/images/furniture_configurator/drawer-test.png";
import PlatesTest from "../../../public/images/furniture_configurator/plates-test.png";
import DeleteIcon from "../../../public/images/furniture_configurator/delete-icon.png";
import Input from "../Input";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { FeetvalidationSchema } from "../../Formik/FormikFunctions";
import {
  CreateDrawer,
  DeleteDrawer,
  EditDrawer,
  AddDrawerList,
  UpdateList,
  DeleteVariation,
} from "../../Functions-configurator/Function-configurator";
import { toast } from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as PositionControlImage } from "../../../public/images/furniture_configurator/positionControlImage.svg";
import FeetImage from "../../../public/images/furniture_configurator/feetPositionImage.png";
import SettingIcon from "../../assets/icons/setting.png";
import { FileUpload } from "primereact/fileupload";
import CustomField from "./CustomField";

export const HandlesAccordianBefore = ({ handleToggle, viewdata }) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL_img;
  const HandleEdit = (id) => {
    localStorage.setItem("editDrawer_id", id);
    handleToggle();
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-[15px] w-full flex-wrap justify-between">
      <div>
        <div className="w-[76px] h-[50px]">
          <img
            className="w-[76px] h-[50px]"
            src={
              viewdata?.images?.length > 0
                ? `${viewdata?.images[0]}`
                : PlatesTest
            }
            alt="Plates_Test"
          />
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4">
              {viewdata?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Config ID</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4">
              {viewdata?.configId}
            </span>
          </div>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Price Einkauf</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4">
              {viewdata?.price_einkauf}
            </span>
          </div>
        </div>
      </div>
      <button
        className="w-[31px] shrink-0"
        onClick={() => HandleEdit(viewdata._id)}
      >
        <img src={DropdownArrowMain} alt="dropdown_arrow_main" />
      </button>
    </div>
  );
};

export const HandlesAccordianAfter = ({
  handleToggle,
  drawerlistUpdate,
  createDrawer,
  viewdata,
}) => {
  const [Image, setImage] = useState();
  const [disabled, setdisabled] = useState(false);
  const fileInputRef = useRef(null);
  const colorInputRef = useRef(null);

  const addFileInputRef = useRef(null);
  const addColorInputRef = useRef(null);

  const variableFileInputRef = useRef(null);
  const variableColorInputRef = useRef(null);
  const [feetSettingVisible, setFeetSettingVisible] = useState(false);
  const [addVariation, setAddVariation] = useState(false);
  const [color, setColor] = useState();

  const [AddImage, setAddImage] = useState();
  const [AddGltf, setAddGltf] = useState();
  const [AddGltfTitle, setAddGltfTitle] = useState();
  const [AddColor, setAddColor] = useState();

  const [variableImage, setVariableImage] = useState();
  const [variableVisible, setVariableVisible] = useState(-1);
  const [variableColor, setVariableColor] = useState();
  const [variableColorVisible, setVariableColorVisible] = useState();

  const [variationList, setVariationList] = useState();

  useEffect(() => {
    setVariationList(viewdata?.list);
  }, [viewdata?.list]);
  useEffect(() => {
    if (viewdata?.color) setColor(`${viewdata?.color}`);
  }, [viewdata?.color]);
  useEffect(() => {
    if (viewdata?.images?.length > 0) setImage(`${viewdata?.images[0]}`);
  }, [viewdata?.images[0]]);


  const addVariationSubmit = async (values) => {
    const id = localStorage.getItem("editDrawer_id");
    console.log(AddGltfTitle);
    let formData = new FormData();
    formData.append("images", AddImage);
    formData.append("gltf", AddGltf);
    formData.append("gltf_title", AddGltfTitle);
    formData.append("name", values.name);
    formData.append("price_einkauf", values.price_einkauf);
    formData.append("color", AddColor);
    const { data, error } = await AddDrawerList(id, formData, "addList");
    if (data) {
      console.log(data.data);
      setVariationList(data?.data);
      setAddVariation(true);
      setAddImage("");
      setAddName("");
      setAddPrice_einkauf("");
      toast.success(data?.message);
    }
  };
  const variationUpdateSubmit = async (values) => {
    console.log(values.gltf_title);
    const id = localStorage.getItem("editDrawer_id");
    let formdata = new FormData();
    formdata.append("index", values.index);
    formdata.append("name", values.name);
    formdata.append("price_einkauf", values.price_einkauf);
    formdata.append("images", variableImage);
    formdata.append("gltf", values.gltf);
    formdata.append("gltf_title", values.gltf_title);
    formdata.append("color", variableColor);
    const { data, error } = await UpdateList(id, formdata, "updateList");
    if (data) {
      setVariationList(data?.data);
      toast.success(data?.message);
    }
  };
  const Handlesubmit = async (values, { resetForm }) => {
    setdisabled(true);
    if (createDrawer) {
      const { data, error } = await CreateDrawer(values, "createfeet");
      if (data) {
        resetForm();
        drawerlistUpdate(data?.data);
        toast.success(data?.message);
        setImage("");
        setdisabled(false);
        handleToggle(); // Close the form or accordion section
      } else {
        toast.error(error?.message);
        setdisabled(false);
      }
    } else {
      const id = localStorage.getItem("editDrawer_id");
      console.log(values);
      const { data, error } = await EditDrawer(values, id, "updatefeet");
      if (data) {
        toast.success(data?.message);
        drawerlistUpdate(data?.data);
        setdisabled(false);
        handleToggle(); // Close the form or accordion section
      } else {
        toast.error(error?.message);
        setdisabled(false);
      }
    }
  };

  const DeleteSelectedDrawer = async (id) => {
    setdisabled(true);
    console.log("here");
    const { data, error } = await DeleteDrawer(id, "deletefeet");
    if (data) {
      toast.success(data?.message);
      drawerlistUpdate(data?.data);
      setdisabled(false);
      handleToggle(); // Close the form or accordion section
    } else {
      toast.error(error?.message);
      setdisabled(false);
    }
  };
  const DeleteSelectedVariation = async (id, index) => {
    const { data, error } = await DeleteVariation(id, index, "deletevariation");
    if (data) {
      setVariationList(data?.data);
      toast.success(data?.message);
    }
  };

  const DrawerinitialValues = {
    name: viewdata?.name || "",
    configId: viewdata?.configId || "",
    supplier_id: viewdata?.supplier_id || "",
    price_einkauf: viewdata?.price_einkauf || "",
    price_aufschlag: viewdata?.price_aufschlag || "",
    con_asset_time_pcs: viewdata?.con_asset_time_pcs || "",
    pack_asset_time_pcs: viewdata?.pack_asset_time_pcs || "",
    images: viewdata?.images[0] || "",
    gltf: viewdata?.gltf || "",
    addFeet: viewdata?.feet?.addFeet || "",
    backFeetX: viewdata?.feet?.backFeetX || "",
    backFeetZ: viewdata?.feet?.backFeetZ || "",
    frontFeetX: viewdata?.feet?.frontFeetX || "",
    frontFeetZ: viewdata?.feet?.frontFeetZ || "",
    middleOffset: viewdata?.feet?.middleOffset || "",
    yOffset: viewdata?.yOffset || "",
    zOffset: viewdata?.zOffset || "",
    xOffset: viewdata?.xOffset || "",
    offSet: viewdata?.offSet || "",
    feetHeight: viewdata?.feet?.feetHeight || "",
    color: viewdata?.color || "",
    priority: viewdata?.priority || "",
    gltf_title: viewdata?.gltf_title || "",
    weight: viewdata?.weight || "",
    length: viewdata?.length || "",
    material: viewdata?.material || "",
    description: viewdata?.description || "",
  };
  ///feet
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
    formik.setFieldValue("images", selectedFile);
  };
  const handleColorClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  const handleColorChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setColor(URL.createObjectURL(selectedFile));
    formik.setFieldValue("color", selectedFile);
    console.log(selectedFile);
  };
  const handleGltfChange = async (event, formik) => {
    const selectedFile = event.files[0];
    // setGltf(URL.createObjectURL(selectedFile));
    formik.setFieldValue("gltf", selectedFile);
    formik.setFieldValue("gltf_title", selectedFile.name);
    console.log(selectedFile.name);
  };
  ///add
  const handleAddImageClick = () => {
    if (addFileInputRef.current) {
      addFileInputRef.current.click();
    }
  };
  const handleAddFileChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setAddImage(selectedFile);
  };
  const handleAddGltfChange = async (event) => {
    const selectedFile = event.files[0];
    setAddGltf(selectedFile);
    setAddGltfTitle(selectedFile.name);
  };
  const handleAddColorClick = () => {
    if (addColorInputRef.current) {
      addColorInputRef.current.click();
    }
  };
  const handleAddColorChange = (e) => {
    const selectedFile = e.target.files[0];
    setAddColor(selectedFile);
    console.log(selectedFile);
  };
  ///variable
  const handleVariableImageClick = (index) => {
    if (variableFileInputRef.current) {
      variableFileInputRef.current.click();
      setVariableVisible(index);
    }
  };
  const handleVariableFileChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setVariableImage(selectedFile);
    formik.setFieldValue("images", selectedFile);
  };
  const handleVariableColorClick = (index) => {
    if (variableColorInputRef.current) {
      variableColorInputRef.current.click();
      setVariableColorVisible(index);
    }
  };
  const handleVariableColorChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setVariableColor(selectedFile);
    formik.setFieldValue("color", selectedFile);
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={DrawerinitialValues}
        onSubmit={Handlesubmit}
        validationSchema={FeetvalidationSchema}
        enableReinitialize
      >
        {(formik) => (
          <Form className="w-full">
            <div className="flex justify-between flex-wrap py-5 pl-5 pr-16 relative">
              <div className="flex items-center justify-center h-full">
                <div
                  className="w-[182px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center"
                  onClick={handleImageClick}
                >
                  {!Image && "upload image"}
                  {Image && (
                    <img
                      className="w-full h-full"
                      src={Image ? Image : viewdata.images[0]}
                      alt="Plates_TEst"
                    />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpeg, .jpg, .png"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, formik)}
                  />
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto" />
              <div className="flex flex-col mb-2  items-start gap-[20px]">
                <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                        id={"name"}
                        name={"name"}
                      />
                      <ErrorMessage
                        name={"name"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Config ID
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4 whitespace-nowrap overflow-hidden text-ellipsis"
                        id={"configId"}
                        name={"configId"}
                        disabled
                      />
                      <ErrorMessage
                        name={"configId"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Supplier ID
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4 whitespace-nowrap overflow-hidden text-ellipsis"
                        id={"supplier_id"}
                        name={"supplier_id"}
                      />
                      <ErrorMessage
                        name={"supplier_id"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Construction Time
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"con_asset_time_pcs"}
                        name={"con_asset_time_pcs"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[18px] leading-[30px] font-[karla] font-normal">
                          min
                        </p>
                      </div>
                      <ErrorMessage
                        name={"con_asset_time_pcs"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Length
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"length"}
                        name={"length"}
                      />
                      <ErrorMessage
                        name={"length"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Weight
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"weight"}
                        name={"weight"}
                      />
                      <ErrorMessage
                        name={"weight"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto" />
              <div className="flex flex-col mb-2  items-start gap-[20px]">
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Price Einkauf{" "}
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"price_einkauf"}
                        name={"price_einkauf"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                          €/pcs
                        </p>
                      </div>
                      <ErrorMessage
                        name={"price_einkauf"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row  mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Price-Profit
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"price_aufschlag"}
                        name={"price_aufschlag"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                          %
                        </p>
                      </div>
                      <ErrorMessage
                        name={"price_aufschlag"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Packing Time
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"pack_asset_time_pcs"}
                        name={"pack_asset_time_pcs"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[18px] leading-[30px] font-[karla] font-normal">
                          min
                        </p>
                      </div>
                      <ErrorMessage
                        name={"pack_asset_time_pcs"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Priority
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"priority"}
                        name={"priority"}
                      />
                      <ErrorMessage
                        name={"priority"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Material
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"material"}
                        name={"material"}
                      />
                      <ErrorMessage
                        name={"material"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto" />
              <div className="flex flex-row items-end gap-[25px] h-full mt-auto">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-row justify-between gap-6">
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        Price verkauf:
                      </h1>
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        {(() => {
                          const price_einkauf =
                            +formik?.values?.price_einkauf || 0;
                          const price_aufschlag =
                            +formik?.values?.price_aufschlag || 0;
                          const totalSalePrice = parseFloat(
                            (
                              price_einkauf +
                              (price_einkauf * price_aufschlag) / 100
                            ).toFixed(2)
                          );

                          // Displaying the calculated total sale price
                          return `${totalSalePrice} €/pcs`; // Display the area in square meters
                        })()}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-between gap-6">
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        Profit per pcs:
                      </h1>
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        {(() => {
                          const price_einkauf =
                            +formik?.values?.price_einkauf || 0;
                          const price_aufschlag =
                            +formik?.values?.price_aufschlag || 0;
                          const totalProfit = parseFloat(
                            (price_einkauf * price_aufschlag) / 100
                          );

                          // Displaying the calculated total sale price
                          return `${totalProfit} €/pcs`; // Display the area in square meters
                        })()}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    {!createDrawer && (
                      <button
                        disabled={disabled}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          DeleteSelectedDrawer(viewdata?._id);
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          className="w-[28px]"
                          src={DeleteIcon}
                          alt="DeleteIcon"
                        />
                      </button>
                    )}
                    <div>
                      <button
                        disabled={disabled}
                        type="submit"
                        className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="absolute right-5 top-5 w-[31px]"
                onClick={() => {
                  localStorage.removeItem("editDrawer_id");
                  handleToggle();
                }}
              >
                <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
              </button>
            </div>
            <div className="">
              <div className="flex float-right ml-[182px] mr-16">
                <div className="m-4">Feet Description</div>
                <div className="rounded-[5px]">
                  <Field component="textarea" className="outline-none w-[32.5rem] border border-black rounded-[5px] h-[100px]"  name="description"></Field>
                  <ErrorMessage
                    name={"description"}
                    component="div"
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="h-[90px]">
              <div className="flex float-right py-5 pl-5 pr-16">
                <div className="flex flex-col mb-2 gap-[20px]">
                  <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Color-Image
                    </h1>
                    <div className="w-[170px]">
                      <div
                        className="w-[100px] text-lg cursor-pointer h-10 bg-[#F6F6F6] flex items-center justify-center"
                        onClick={handleColorClick}
                      >
                        {!color && "upload image"}
                        {color && (
                          <img
                            className="w-full h-full"
                            src={color ? color : viewdata.images[0]}
                            alt="Plates_TEst"
                          />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpeg, .jpg, .png"
                          ref={colorInputRef}
                          onChange={(e) => handleColorChange(e, formik)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-row gap-[25px] h-full">
                  <div className="card flex justify-content-center">
                    <FileUpload
                      mode="basic"
                      id="gltf"
                      name="gltf"
                      accept="*.*"
                      // maxFileSize={1000000}
                      customUpload
                      chooseLabel={
                        DrawerinitialValues.gltf_title
                          ? DrawerinitialValues.gltf_title
                          : "Choose"
                      }
                      onSelect={(event) => handleGltfChange(event, formik)}
                      className="bg-[#456779] text-white rounded-[5px] font-bold pl-5 pr-5 flex items-center justify-center"
                    />
                  </div>
                  {!createDrawer && (
                    <div className="gap-[25px]">
                      <button
                        disabled={disabled}
                        onClick={() => {
                          setFeetSettingVisible(false);
                          addVariation
                            ? setAddVariation(false)
                            : setAddVariation(true);
                        }}
                        type="button"
                        className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        ADD - Variation
                      </button>
                    </div>
                  )}

                  <div className="left-0">
                    <button
                      disabled={disabled}
                      onClick={() => {
                        setAddVariation(false);
                        feetSettingVisible
                          ? setFeetSettingVisible(false)
                          : setFeetSettingVisible(true);
                      }}
                      type="button"
                      className="flex items-center font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                    >
                      <img
                        src={SettingIcon}
                        className="w-[20px] h-[20px] mx-2"
                        alt="Settings Icon"
                      />
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {feetSettingVisible && (
              <div className="w-full flex justify-between flex-wrap py-5 pl-5 pr-16 relative border-t-[3px] border-t-[#000000]">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Add Feet On ={" "}
                    </h1>
                    <div className="w-[170px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                          id={"addFeet"}
                          name={"addFeet"}
                        />
                        <ErrorMessage
                          name={"addFeet"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                    <h1>1</h1>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Back Feet X =
                    </h1>
                    <div className="w-[170px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4 whitespace-nowrap overflow-hidden text-ellipsis"
                          id={"backFeetX"}
                          name={"backFeetX"}
                        />
                        <ErrorMessage
                          name={"backFeetX"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                    <h1>2</h1>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Back Feet Z =
                    </h1>
                    <div className="w-[170px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4 whitespace-nowrap overflow-hidden text-ellipsis"
                          id={"backFeetZ"}
                          name={"backFeetZ"}
                        />
                        <ErrorMessage
                          name={"backFeetZ"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                    <h1>3</h1>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Front Feet X =
                    </h1>
                    <div className="w-[170px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                          id={"frontFeetX"}
                          name={"frontFeetX"}
                        />
                        <ErrorMessage
                          name={"frontFeetX"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                    <h1>4</h1>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Front Feet Z =
                    </h1>
                    <div className="w-[170px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                          id={"frontFeetZ"}
                          name={"frontFeetZ"}
                        />
                        <ErrorMessage
                          name={"frontFeetZ"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                    <h1>5</h1>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Mid ° Offset =
                    </h1>
                    <div className="w-[170px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                          id={"middleOffset"}
                          name={"middleOffset"}
                        />
                        <ErrorMessage
                          name={"middleOffset"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                    <h1>6</h1>
                  </div>
                </div>
                <div className="flex items-center justify-center h-full">
                  <div className="w-[360px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center">
                    <img
                      className="w-[360px] h-[200px]"
                      src={FeetImage}
                      alt="Plates_TEst"
                    />
                  </div>
                </div>
                <div className="w-[2px] bg-[#000000] mt-[-20px] h-auto" />
                <div className="flex mb-2  items-start gap-[20px]">
                  <div className="mt-10">
                    <PositionControlImage />
                  </div>
                  <div className="flex-col">
                    <div className="flex flex-row  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-bold">
                        Position Control
                      </h1>
                    </div>
                    <div className="flex flex-row  justify-between w-full gap-[25px] mb-2">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        Y Offset
                      </h1>
                      <div className="w-[170px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                            id={"yOffset"}
                            name={"yOffset"}
                          />
                          <ErrorMessage
                            name={"yOffset"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row  mb-2  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        Z Offset
                      </h1>
                      <div className="w-[170px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                            id={"zOffset"}
                            name={"zOffset"}
                          />
                          <ErrorMessage
                            name={"zOffset"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        X Offset
                      </h1>
                      <div className="w-[170px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                            id={"xOffset"}
                            name={"xOffset"}
                          />
                          <ErrorMessage
                            name={"xOffset"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        ° Offset
                      </h1>
                      <div className="w-[170px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                            id={"offSet"}
                            name={"offSet"}
                          />
                          <ErrorMessage
                            name={"offSet"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        Feet-Height
                      </h1>
                      <div className="w-[170px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                            id={"feetHeight"}
                            name={"feetHeight"}
                          />
                          <ErrorMessage
                            name={"feetHeight"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {addVariation && (
        <div className="w-full">
          {variationList.map((variation, index) => (
            <Formik
              key={index}
              initialValues={{
                index: index,
                name: variation.name,
                price_einkauf: variation.price_einkauf,
              }}
              onSubmit={variationUpdateSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="w-full flex justify-between flex-wrap py-5 pl-5 pr-16 relative border-t-[2px] border-black">
                    <div className="flex items-center justify-center h-full">
                      <div
                        className="w-[182px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center"
                        data-index={index}
                        onClick={(e) => handleVariableImageClick(index)}
                      >
                        <img
                          className="w-full h-full"
                          src={
                            variableImage && variableVisible == index
                              ? URL.createObjectURL(variableImage)
                              : variation.images[0]
                          }
                        />
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpeg, .jpg, .png"
                          ref={variableFileInputRef}
                          onChange={(e) => handleVariableFileChange(e, formik)}
                        />
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                              id={"name"}
                              name={"name"}
                            />
                            <Field
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                              id={"index"}
                              name={"index"}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Price Einkauf{" "}
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                              id={"price_einkauf"}
                              name={"price_einkauf"}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                              <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                                €/pcs
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-row items-end gap-[25px] h-full mt-[30px]">
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[5px]">
                          <div className="flex flex-row justify-between gap-6">
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[90px]">
                    <div className="flex float-right py-5 pl-5 pr-16">
                      <div className="flex flex-col mb-2 gap-[20px]">
                        <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                          <h1 className="font-[karla] text-[20px] font-medium">
                            Color-Picker
                          </h1>
                          <div className="w-[170px]">
                            <div
                              className="w-[100px] text-lg cursor-pointer h-10 bg-[#F6F6F6] flex items-center justify-center"
                              onClick={(e) => handleVariableColorClick(index)}
                            >
                              <img
                                className="w-full h-full"
                                src={
                                  variableColor && variableColorVisible == index
                                    ? URL.createObjectURL(variableColor)
                                    : variation.color
                                }
                                alt="Plates_TEst"
                              />
                              <input
                                type="file"
                                className="hidden"
                                accept=".jpeg, .jpg, .png"
                                ref={variableColorInputRef}
                                onChange={(e) =>
                                  handleVariableColorChange(e, formik)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center flex-row gap-[25px] h-full">
                        <div className="card flex justify-content-center">
                          <FileUpload
                            mode="basic"
                            id="gltf"
                            name="gltf"
                            accept="*.*"
                            // maxFileSize={1000000}
                            customUpload
                            chooseLabel={
                              variation.gltf_title
                                ? variation.gltf_title
                                : "Choose"
                            }
                            onSelect={(event) =>
                              handleGltfChange(event, formik)
                            }
                            className="bg-[#456779] text-white rounded-[5px] font-bold pl-5 pr-5 flex items-center justify-center"
                          />
                        </div>
                        {!createDrawer && (
                          <div className="gap-[25px]">
                            {!createDrawer && (
                              <button
                                onClick={() =>
                                  DeleteSelectedVariation(viewdata?._id, index)
                                }
                                className="cursor-pointer"
                                type="button"
                              >
                                <img
                                  className="w-[28px]"
                                  src={DeleteIcon}
                                  alt="DeleteIcon"
                                />
                              </button>
                            )}
                          </div>
                        )}

                        <div className="left-0">
                          <button
                            type="submit"
                            className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          ))}
          {variationList.length < 2 && (
            <Formik
              initialValues={{ name: "", price_einkauf: "" }}
              onSubmit={addVariationSubmit}
            >
              <Form>
                <div>
                  <div className="w-full flex justify-between flex-wrap py-5 pl-5 pr-16 relative border-t-[2px] border-black">
                    <div className="flex items-center justify-center h-full">
                      <div
                        className="w-[182px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center"
                        onClick={handleAddImageClick}
                      >
                        {!AddImage && "upload image"}
                        {AddImage && (
                          <img
                            className="w-full h-full"
                            src={URL.createObjectURL(AddImage)}
                          />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpeg, .jpg, .png"
                          ref={addFileInputRef}
                          onChange={(e) => handleAddFileChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                              id={"name"}
                              name={"name"}
                              // onChange={(e) => setAddName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Price Einkauf{" "}
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                              id={"price_einkauf"}
                              name={"price_einkauf"}
                              // onChange={(e) => setAddPrice_einkauf(e.target.value)}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                              <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                                €/pcs
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-row items-end gap-[25px] h-full mt-[30px]">
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[5px]">
                          <div className="flex flex-row justify-between gap-6">
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[90px]">
                    <div className="flex float-right py-5 pl-5 pr-16">
                      <div className="flex flex-col mb-2 gap-[20px]">
                        <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                          <h1 className="font-[karla] text-[20px] font-medium">
                            Color-Image
                          </h1>
                          <div className="w-[170px]">
                            {/* <div className="relative">
                          {colorPicker && (
                            <CustomColorpicker
                              color={color}
                              setColor={setColor}
                              colorPicker={colorPicker}
                              setColorPicker={setColorPicker}
                            />
                          )}
                          <div
                            className="w-[100px] text-lg cursor-pointer h-[32px] bg-[#F6F6F6] flex items-center justify-center border border-solid border-black"
                            style={{ backgroundColor: color }}
                            onClick={() => setColorPicker(true)}
                          ></div>
                        </div> */}
                            <div
                              className="w-[100px] text-lg cursor-pointer h-10 bg-[#F6F6F6] flex items-center justify-center"
                              onClick={handleAddColorClick}
                            >
                              {!AddColor && "upload image"}
                              {AddColor && (
                                <img
                                  className="w-full h-full"
                                  src={URL.createObjectURL(AddColor)}
                                  alt="Plates_TEst"
                                />
                              )}
                              <input
                                type="file"
                                className="hidden"
                                accept=".jpeg, .jpg, .png"
                                ref={addColorInputRef}
                                onChange={(e) => handleAddColorChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center flex-row gap-[25px] h-full">
                        <div className="card flex justify-content-center">
                          <FileUpload
                            mode="basic"
                            id="gltf"
                            name="gltf"
                            accept="*.*"
                            // maxFileSize={1000000}
                            customUpload
                            onSelect={(event) => handleAddGltfChange(event)}
                            className="bg-[#456779] text-white rounded-[5px] font-bold pl-5 pr-5 flex items-center justify-center"
                          />
                        </div>

                        <div className="left-0">
                          <button
                            type="submit"
                            className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      )}
    </div>
  );
};
