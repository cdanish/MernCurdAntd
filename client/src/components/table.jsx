import React, { useEffect } from 'react';
import { Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent, getallstudents } from '../redux/features/studentSlice';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function StudentTable() {
    const dispatch = useDispatch();
    const { loading, students } = useSelector(state => state.student);

    useEffect(() => {
        dispatch(getallstudents());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteStudent({ id, toast }));
    };

    const columns = [
        { title: 'ID', dataIndex: 'sid', key: 'id_column' },
        { title: 'Name', dataIndex: 'sname', key: 'name_column' },
        { title: 'Address', dataIndex: 'saddress', key: 'address_column' },
        {
            title: 'Class',
            dataIndex: ['sclass', 'Cname'],
            key: 'class_column',
            render: (text, record) => record?.sclass?.Cname || text
        },
        { title: 'Phone', dataIndex: 'sphone', key: 'phone_column' },
        {
            title: 'Edit',
            key: 'edit_column',
            render: (_, record) => (
                <Button key={`edit-button-${record?._id || record?.sid}`} type="primary">
                    <Link to={`/updatestudent/${record?.sid}`}>
                        Edit
                    </Link>
                </Button>
            )
        },
        {
            title: 'Delete',
            key: 'delete_column',
            render: (_, record) => (
                <Button
                    danger
                    key={`delete-button-${record?._id || record?.sid}`}
                    type="primary"
                    onClick={() => handleDelete(record?.sid)}
                >
                    Delete
                </Button>
            )
        }
    ];

    return (
        <div className='table' style={{ padding: '20px', background: '#fff' }}>
            <Table
                loading={loading}
                dataSource={students}
                columns={columns}
                rowKey={(record) => record?._id || record?.sid} // Ensure unique rowKey
            />
        </div>
    );
}

export default StudentTable;
