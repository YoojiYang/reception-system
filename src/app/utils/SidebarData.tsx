import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HailIcon from '@mui/icons-material/Hail';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

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
    Title: "個室担当者",
    icon:<MeetingRoomIcon fontSize={ fontSize } />,
    link: "/inCharge",
  },
  {
    Title: "タクシー受付",
    icon:<HailIcon fontSize={ fontSize } />,
    link: "/taxi/reception",
  },
];