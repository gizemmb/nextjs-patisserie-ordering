import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { footerSchema } from "@/schema/footerSchema";
import Title from "../ui/Title";
import Input from "@/components/form/Input";

const Footer = () => {
  const [linkAddress, setLinkAddress] = useState("https://");
  const [iconName, setIconName] = useState("fa fa-");
  const [footerData, setFooterData] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(footerSchema),
    mode: "onTouched",
    defaultValues: {
      location: "",
      email: "",
      phoneNumber: "",
      desc: "",
      day: "",
      time: "",
    },
  });

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        if (res.data && res.data.length > 0) {
          const data = res.data[0];
          setFooterData(data);
          setSocialLinks(data?.socialMedia || []);

          reset({
            location: data.location || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            desc: data.desc || "",
            day: data.openingHours?.day || "",
            time: data.openingHours?.hour || "",
          });
        } else {
          console.log("No footer data found");
          setFooterData(null);
          setSocialLinks([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFooterData();
  }, [reset]);
  console.log(footerData);

  const handleCreate = () => {
    setSocialLinks((prev) => [...prev, { icon: iconName, link: linkAddress }]);
    setLinkAddress("https://");
    setIconName("fa fa-");
  };
  const onSubmit = async (values) => {
    try {
      if (footerData && footerData._id) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
          {
            location: values.location,
            email: values.email,
            phoneNumber: values.phoneNumber,
            desc: values.desc,
            openingHours: {
              day: values.day,
              hour: values.time,
            },
            socialMedia: socialLinks,
          }
        );
        if (res.status === 200) {
          toast.success("Footer updated successfully");
        }
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`,
          {
            location: values.location,
            email: values.email,
            phoneNumber: values.phoneNumber,
            desc: values.desc,
            openingHours: {
              day: values.day,
              hour: values.time,
            },
            socialMedia: socialLinks,
          }
        );
        if (res.status === 201) {
          toast.success("Footer created successfully");
          setFooterData(res.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const inputs = [
    { id: 1, name: "location", type: "text", placeholder: "Your Location" },
    { id: 2, name: "email", type: "text", placeholder: "Your Email" },
    {
      id: 3,
      name: "phoneNumber",
      type: "text",
      placeholder: "Your Phone Number",
    },
    { id: 4, name: "desc", type: "text", placeholder: "Your Description" },
    { id: 5, name: "day", type: "text", placeholder: "Update Day" },
    { id: 6, name: "time", type: "text", placeholder: "Update Time" },
  ];

  return (
    <form className="px-10 pb-10 flex-1" onSubmit={handleSubmit(onSubmit)}>
      <Title addClass="text-primary-dark text-[30px] py-5">Footer</Title>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        {inputs.map((input) => (
          <div key={input.id}>
            <Input {...input} {...register(input.name)} />
            {errors[input.name] && (
              <p className="text-red-600 text-xs mt-1">
                {errors[input.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row mt-5 gap-4 md:gap-10 items-center">
        <Input
          placeholder="Link Address"
          value={linkAddress}
          onChange={(e) => setLinkAddress(e.target.value)}
        />
        <Input
          placeholder="Icon name (fa-facebook)"
          value={iconName}
          onChange={(e) => setIconName(e.target.value)}
        />
        <button
          type="button"
          onClick={handleCreate}
          className="bg-green-600 text-white text-md rounded-full px-4 py-2 cursor-pointer"
        >
          Add
        </button>
      </div>
      <ul className="flex gap-4 flex-wrap mt-5">
        {socialLinks?.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            <i className={`fa ${item.icon} text-primary-dark text-2xl`}></i>
            <a
              href={item.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {item.link}
            </a>
            <button
              type="button"
              onClick={() => removeLink(index)}
              className="text-red-600 hover:text-red-800"
            >
              <i className="fa fa-trash text-xl"></i>
            </button>
          </li>
        ))}
      </ul>

      <div className="pt-4">
        <button className="update-btn" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default Footer;
