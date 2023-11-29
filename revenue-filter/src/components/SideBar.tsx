import icon1 from "../assets/icons/SideBarIcons/bar-1.svg";
import icon2 from "../assets/icons/SideBarIcons/bar-2.svg";
import icon3 from "../assets/icons/SideBarIcons/bar-3.svg";
import icon4 from "../assets/icons/SideBarIcons/bar-4.svg";

const SideBar = () => {
  return (
    <div className="hidden md:flex h-screen">
      <ul className="text-black h-fit w-fit absolute top-1/4 left-0 border rounded-full p-2">
        <li className="p-1 hover:cursor-pointer">
          <img src={icon1} alt="" />
        </li>
        <li className="p-1 hover:cursor-pointer">
          <img src={icon2} alt="" />
        </li>
        <li className="p-1 hover:cursor-pointer">
          <img src={icon3} alt="" />
        </li>
        <li className="p-1 hover:cursor-pointer">
          <img src={icon4} alt="" />
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
