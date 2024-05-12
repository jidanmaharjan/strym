import { Menu, MenuProps } from 'antd';
import { BiVolumeFull } from 'react-icons/bi';
import { FiMusic } from 'react-icons/fi';
import { IoHeartOutline } from 'react-icons/io5';
import { LuLibrary } from 'react-icons/lu';
import { MdOutlineAddBox } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate()
    type MenuItem = Required<MenuProps>['items'][number];


    const items: MenuItem[] = [
        { key: 'home', icon: <FiMusic />, label: 'Home' },
        { key: 'genre', icon: <BiVolumeFull />, label: 'Genre' },
        { key: 'library', icon: <LuLibrary />, label: 'Library' },
        {type: 'divider'},
        { key: 'library/add', icon: <MdOutlineAddBox />, label: 'Add Library' },
        { key: 'liked_songs', icon: <IoHeartOutline />, label: 'Liked Songs' },
        
      ];
  return (
    <Menu
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
    theme="light"
    items={items}
    className='h-screen w-60 pt-20'
    onClick={(e)=>navigate(e.key)}
  />
  )
}

export default Sidebar