import React, { useState } from "react";

const List = ({ data, onRowClick, onSort }) => {
    data = JSON.parse(data);
    return (
        <div>
            <table className="table" border="1">
                <thead>
                    <tr>
                        <th onClick={() => onSort('title')}>Title</th>
                        <th onClick={() => onSort('author')}> Author</th>
                        <th>URL</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((o) => {
                        return (
                            <tr key={o.objectID} onClick={() => onRowClick(o)}>
                                <td>{o.title}</td>
                                <td>{o.author}</td>
                                <td><a href={o.url}>{o.url}</a></td>
                                <td>{o.created_at}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default List;
