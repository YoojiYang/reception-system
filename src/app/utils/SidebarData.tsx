import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HailIcon from '@mui/icons-material/Hail';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const fontSize = "large";

export const SidebarData = [
  {
    Title: "Home",
    icon:<HomeIcon fontSize={ fontSize }/>,
    link: "/",
  },
  {
    Title: "Reception",
    icon:<PeopleIcon fontSize={ fontSize } />,
    link: "/reception",
  },
  {
    Title: "Desk",
    icon:<PersonAddIcon fontSize={ fontSize } />,
    link: "/desk",
  },
  {
    Title: "BAL/BOX",
    icon:<MeetingRoomIcon fontSize={ fontSize } />,
    link: "/inCharge",
  },
  {
    Title: "タクシー受付",
    icon:<HailIcon fontSize={ fontSize } />,
    link: "/taxi/reception",
  },
  {
    Title: "タクシー案内",
    icon:<LocalTaxiIcon fontSize={ fontSize } />,
    link: "/taxi/usageinfo",
  },
  {
    Title: "個室担当登録",
    icon:<AddCircleIcon fontSize={ fontSize } />,
    link: "/addInCharge",
  },
];