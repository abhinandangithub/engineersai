import React, { useState, useEffect } from "react";
import List from './listPage';
import Pagination from '@material-ui/lab/Pagination';
import useInfiniteScroll from '../scroll/infinitescroll';

const ManageList = () => {
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [sortHeader, setSortHeader] = useState();
    const [value, setValue] = useState(1);
    // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    // function fetchMoreListItems() {
    //     setTimeout(() => {
    //         setData(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1)]));
    //         setIsFetching(false);
    //     }, 2000);
    // }

    async function fetchData(value) {
        const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${value - 1}`);
        res
            .json()
            .then(res => {
                setData(res.hits);
                setOriginalData(res.hits);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        setData([]);
        fetchData(value);
    }, [value]);

    useEffect(() => {
        const results = originalData.filter(o =>
            o.title.indexOf(searchTerm) > -1 || o.author.indexOf(searchTerm) > -1
        );
        setData(results);
    }, [searchTerm]);

    useEffect(() => {
        let results = originalData.sort(function (a, b) {
            if (a[sortHeader] < b[sortHeader]) {
                return -1;
            }
            if (a[sortHeader] > b[sortHeader]) {
                return 1;
            }
            return 0;
        });
        setData(results);
    }, [sortHeader]);

    const handlePageChange = (event, value) => {
        setValue(value);
    }

    function handleClick(event) {
        alert(JSON.stringify(event));
    }

    function handleChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleSort(event) {
        setSortHeader(event);
    }

    return !data.length ?
        <h1>Loading...</h1> :
        <div>
            <Pagination onChange={handlePageChange} page={value} count={10} color="primary" />
            <br />
            Search: <input onChange={handleChange} value={searchTerm} placeholder="search by title and author" />
            <br />
            <br />

            <List data={JSON.stringify(data)} onRowClick={handleClick} onSort={handleSort} />;
    </div>

};
export default ManageList;