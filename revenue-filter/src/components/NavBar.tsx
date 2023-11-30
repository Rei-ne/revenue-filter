import logo from "../assets/icons/navIcons/mainstack-logo.svg";
import home from "../assets/icons/navIcons/home.svg";
import analytics from "../assets/icons/navIcons/insert_chart.svg";
import revenue from "../assets/icons/navIcons/payments.svg";
import crm from "../assets/icons/navIcons/group.svg";
import apps from "../assets/icons/navIcons/widgets.svg";
import bell from "../assets/icons/navIcons/notifications.svg";
import chat from "../assets/icons/navIcons/chat.svg";
import menu from "../assets/icons/navIcons/menu.svg";

const NavBar = () => {
  const NavItems = [
    {
      id: 1,
      title: "Home",
      iconImg: `${home}`,
    },
    {
      id: 2,
      title: "Analytics",
      iconImg: `${analytics}`,
    },
    {
      id: 3,
      title: "Revenue",
      iconImg: `${revenue}`,
    },
    {
      id: 4,
      title: "CRM",
      iconImg: `${crm}`,
    },
    {
      id: 5,
      title: "Apps",
      iconImg: `${apps}`,
    },
  ];

  const getNavItemStyles = (id: number) => {
    if (id === 3) {
      return {
        backgroundColor: "black",
        color: "white",
        borderRadius: "50px",
        padding: "12px",
      };
    }
    return {};
  };
  return (
    <nav className="sticky top-0 bg-white z-20 border-none ">
      {/* desktop nav */}
      <div className="text-black  hidden md:h-16 md:flex md:flex-row justify-evenly md:justify-between items-center w-full border border-t-0 rounded-full">
        {/* Navbar content */}
        <img
          src={logo}
          alt="mainstack-logo"
          className="px-5 hover:cursor-pointer"
        />
        <ul className="flex space-x-4 pr-8">
          {NavItems.map((navItem) => (
            <li
              key={navItem.id}
              className="hover:cursor-pointer flex p-3 items-center gap-1 text-sm"
              style={getNavItemStyles(navItem.id)}
            >
              <img src={navItem.iconImg} alt={navItem.title}></img>{" "}
              {navItem.title}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between w-fit gap-4">
          <img className="hover:cursor-pointer" src={bell} alt="bell-icon" />
          <img className="hover:cursor-pointer" src={chat} alt="chat-icon" />
          <div className="hover:cursor-pointer flex bg-gray-100 rounded-full mx-3 items-center justify-center p-0.5 ">
            <p className="text-xs text-center bg-black rounded-full p-2 text-white m-1 ">
              OJ
            </p>
            <img className="h-6 w-6 mr-2 m-1" src={menu} alt="menu-icon" />
          </div>
        </div>
      </div>

      {/* mobile nav */}
      <div className="text-black h-52 md:hidden flex flex-col md:flex-row  justify-evenly md:justify-between items-center w-full border rounded-sm border-t-0">
        {/* Navbar content */}
        <img src={logo} alt="mainstack-logo" className="px-5" />
        <ul className="flex space-x-4 pr-4 flex-wrap items-center justify-center w-4/5">
          {NavItems.map((navItem) => (
            <li
              key={navItem.id}
              className="flex p-1 items-center gap-1 text-sm"
              style={getNavItemStyles(navItem.id)}
            >
              <img src={navItem.iconImg} alt={navItem.title}></img>{" "}
              {navItem.title}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center w-fit gap-2 ">
          <div className="flex bg-gray-100 rounded-full mx-3 items-center justify-center p-0.5 ">
            <p className="text-xs text-center bg-black rounded-full p-2 text-white m-1 ">
              OJ
            </p>
            <img className="h-6 w-6 mr-2 m-1" src={menu} alt="menu-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
