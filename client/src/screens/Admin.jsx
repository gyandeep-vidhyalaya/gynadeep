import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './styles/Admin.css'
import { Link, useNavigate } from 'react-router-dom'
import AddTeachers from '../settings/AddTeachers'
import ManageTeachers from '../settings/ManageTeachers'
import EditTeacher from '../settings/EditTeacher'
import AddActivity from '../settings/AddActivity'
import RemoveActivity from '../settings/RemoveActivity'
import AddResult from '../settings/AddResult'
import RemoveResult from '../settings/RemoveResult'
import { ToggleNav } from '../components/Navbar'
const ADMIN = import.meta.env.VITE_ADMIN;

const Admin = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem(ADMIN);
        navigate('/');
    };
    const [teacherToEdit, setteacherToEdit] = useState({});
    const [settingpage, setsettingpage] = useState('manage-teachers');

    const handleAddTeachersPage = () => {
        setsettingpage('add-teachers');
        ToggleNav();
    };

    const handleManageTeachersPage = () => {
        setsettingpage('manage-teachers');
        ToggleNav();
    };

    const handleAddActivityPage = () => {
        setsettingpage('add-activity');
        ToggleNav();
    };

    const handleRemoveActivityPage = () => {
        setsettingpage('remove-activity');
        ToggleNav();
    };

    const handleAddResultsPage = () => {
        setsettingpage('add-result');
        ToggleNav();
    };

    const handleRemoveResultsPage = () => {
        setsettingpage('remove-result');
        ToggleNav();
    };

    return (
        localStorage.getItem(ADMIN) ?
            <div style={{ "height": "100%" }}>
                <Navbar />
                <div className='Settings'>
                    <div className="Left">
                        <ul>
                            <li className="nav-item">

                                <Link className="nav-link navtext" onClick={handleAddTeachersPage}>
                                    {
                                        settingpage === 'add-teachers' ?
                                            <u>
                                                Add a Teacher
                                            </u> :
                                            "Add a Teacher"
                                    }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navtext" onClick={handleManageTeachersPage}>
                                    {
                                        settingpage === 'manage-teachers' ?
                                            <u>
                                                Manage Staff
                                            </u> :
                                            "Manage Staff"
                                    }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navtext" onClick={handleAddActivityPage}>
                                    {
                                        settingpage === 'add-activity' ?
                                            <u>
                                                Add Activity
                                            </u> :
                                            "Add Activity"
                                    }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navtext" onClick={handleRemoveActivityPage}>
                                    {
                                        settingpage === 'remove-activity' ?
                                            <u>
                                                Remove Activity
                                            </u> :
                                            "Remove Activity"
                                    }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navtext" onClick={handleAddResultsPage}>
                                    {
                                        settingpage === 'add-result' ?
                                            <u>
                                                Add Result
                                            </u> :
                                            "Add Result"
                                    }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navtext" onClick={handleRemoveResultsPage}>
                                {
                                        settingpage === 'remove-result' ?
                                            <u>
                                                Remove Result
                                            </u> :
                                            "Remove Result"
                                    }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={handleLogout} className="nav-link navtext" to="/">Logout</Link>
                            </li>

                        </ul>
                    </div>
                    {
                        settingpage == 'add-teachers' ?
                            <AddTeachers />
                            :
                            settingpage == 'manage-teachers' ?
                                <ManageTeachers func={setsettingpage} teacher={setteacherToEdit} />
                                :
                                settingpage == 'edit-teachers' ?
                                    <EditTeacher func={setsettingpage} teacher={teacherToEdit} />
                                    :
                                    settingpage == 'add-activity' ?
                                        <AddActivity />
                                        :
                                        settingpage == 'remove-activity' ?
                                            <RemoveActivity />
                                            :
                                            settingpage == 'add-result' ?
                                                <AddResult />
                                                :
                                                settingpage == 'remove-result' ?
                                                <RemoveResult/>:
                                                ""
                    }
                </div>
            </div> : "404, not Found!"
    )
}

export default Admin
