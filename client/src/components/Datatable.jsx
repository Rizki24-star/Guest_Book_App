import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';

const Datatable = ({ guest }) => {
    const [searchText, setSearchText] = useState('');

    const data = guest 

    console.log(data)

    const formatDate = (data) => {
        const date = new Date(data.date_of_birth);
        return format(date, 'dd MMMM yyyy'); 
    };

    const columns = [
        { name: 'No', selector: (_, index) => index + 1, sortable: true.toString() },
        { name: 'Name', selector: (data) => data.name, sortable: true.toString() },
        { name: 'Email', selector: (data) => data.email, sortable: true.toString() },
        { name: 'Date of birth', selector: formatDate, sortable: true.toString() },
        { name: 'ID Card Number', selector: (data) => data.id_card_number, sortable: true.toString() },
    ];

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = Array.isArray(data)
  ? data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
  : [];

    return (
        <>
            <div className='d-flex p-2'>
                <div className='ms-auto'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder="Search.."
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                isrtl={false}
            />
        </>
    );
};

export default Datatable;