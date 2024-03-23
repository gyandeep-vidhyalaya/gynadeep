import React, { useState, useEffect } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const RemoveResult = () => {

    const [count, setcount] = useState(0);
    const [results, setresults] = useState([]);
    const [remove, setremove] = useState('Remove');

    const loadResult = async () => {
        const response = await fetch(`${BACKEND_URL}/api/resultdata`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        setresults(json);
    };

    const handleRemoveResult = async (result) => {
        if(!confirm('Are you sure You Want to delete this result? '))
            return;
        setremove('');
        try {
            const response = await fetch(`${BACKEND_URL}/api/deleteresult`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id:result._id,
                    img:result.img
                })
            })

            const json = await response.json();
            if(json['success'])
                alert("Result Removed Successfully");
            else
                alert("Tru Again");
            setcount(count + 1);
            
        } catch (error) {
            alert("Try Again");
        } finally {
            setremove('Remove');
        }
    };

    useEffect(() => {
        loadResult();
    }, [count]);

    return (
        <div className="Right" style={{ "flexDirection": "column", "justifyContent": "left" }}>
            <h1>Remove Result</h1>
            <div className="result-container mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Standard</th>
                            <th>Division</th>
                            <th>Year</th>
                            <th>View</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={result._id}>
                                <td>{index + 1}</td>
                                <td>{result.standard}</td>
                                <td>{result.division}</td>
                                <td>{result.year}</td>
                                <td>
                                    <a href={result.img} target='_blank'>View</a>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveResult(result)}
                                        disabled={remove != 'Remove'}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RemoveResult;
