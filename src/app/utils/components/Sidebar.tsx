import { useEffect, useState } from "react";
import { SidebarData } from "../SidebarData";
import MenuIcon from '@mui/icons-material/Menu';

function Sidebar({ alwaysOpen = false}) {
  const [isOpened, setIsOpened] = useState(alwaysOpen);

  const handleSidebarToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (alwaysOpen) return;

    event.stopPropagation();
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    if (alwaysOpen) setIsOpened(true);
  }, [alwaysOpen]);

  return (
    <div>
    { !alwaysOpen && isOpened && (
      <div
      className='fixed top-0 left-0 h-screen w-screen'
      onClick={ () => { setIsOpened(false); }}
      ></div>
    )}
      <div>
        { !alwaysOpen && (
          <div>
            <button
              className="m-2 p-1 z-10 absolute top-0 left-0 border border-4 border-gray-500 rounded-lg"
              onClick={ handleSidebarToggle }
              >
              <MenuIcon fontSize="large" />
            </button>
          </div>
        )}
        <div
          className={`transition-all duration-300 transform ${isOpened ? 'translate-x-0' : '-translate-x-full'} w-52 fixed top-0 left-0 h-full overflow-x-hidden`}
          >
          <div className="h-screen w-full bg-gray-200/80">
            <div className="p-5 text-center text-2xl">
              <h1>MENU</h1>
            </div>
            <div className="">
              <ul>
                { SidebarData.map((item, index) => {
                  return(
                    <li
                    key={ index }
                    className="p-3 flex items-center space-x-4 h-16 text-xl hover:bg-white cursor-pointer"
                    onClick={ () => { window.location.pathname = item.link; }}
                    >
                      <div id="index" className="w-1/5 flex justify-center">{ item.icon }</div>
                      <div id="index" className="w-4/5 ">{ item.Title }</div>
                    </li>
                  );
                })
              }
              </ul>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Sidebar;