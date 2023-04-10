import './App';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import logoPhonebook from './assets/phonebook.png'


function Contact() {

    const baseURL = "https://localhost:7094/Contact";
    const [updateData, setUpdateData] = useState(true);
    const [data, setData] = useState([]);
    const [contacts] = useState(data);
    const [search, setSearch] = useState({});
    const [contactData, setContactData] = useState({});
    const [showContactData, setShowContactData] = useState(false);
    const [groupedData, setGroupedData] = useState({});
    const [showGroupedData, setShowGroupedData] = useState(false);

    const getOrder = async () => {
        await axios.get(baseURL)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const sortBy = (field) => {
        const sortedData = [...data].sort((a, b) => a[field].localeCompare(b[field]));
        setData(sortedData);
    }

    useEffect(() => {
        const grouped = data.reduce((result, item) => {
            const { sector, ...rest } = item;
            result[sector] = result[sector] || [];
            result[sector].push(rest);
            return result;
        }, {});
        setGroupedData(grouped);
    }, [data]);

    const toggleGroupedData = () => {
        setShowGroupedData(!showGroupedData);
    }

    useEffect(() => {
        const contact = data.reduce((result, item) => {
            const { sector, ...rest } = item;
            result[sector] = result[sector] || [];
            result[sector].push(rest);
            return result;
        }, {});
        setContactData(contact);
    }, [data]);

    const toggleContactData = () => {
        setShowContactData(!showContactData);
    }

    useEffect(() => {
        if (updateData) {
            getOrder();
            setUpdateData(false);
        }
    }, [contacts, updateData]);

    return (
        <div className="user-container">
            <br />
            <header>
                <img src={logoPhonebook} alt='Phonebook'></img>
                <h1>Agenda de colaboradores</h1>
            </header>
            <div className="btn-sort">
                <button onClick={toggleContactData}>
                    {showContactData ? 'Recolher' : 'Exibir contatos'}</button>
                <button onClick={() => sortBy('name')}>Ordenar por Nome</button>
                <button onClick={() => sortBy('sector')}>Ordenar por Setor</button>
                <button onClick={toggleGroupedData}>
                    {showGroupedData ? 'Recolher' : 'Agrupar por setor'}
                </button>
                <input type="search" id="busca" onChange={(e) => setSearch(search)} />
            </div>
            {showGroupedData && (
                <div className='SContacts'>
                    <br />
                    <h1>Contatos agrupados por setor</h1>
                    <br />
                    <ul>
                        {Object.entries(groupedData).map(([sector, items]) => (
                            <li key={sector} className='SList'>
                                <h2>{sector}</h2>

                                <th>
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <th>{item.id}</th>
                                            <th>{item.name}</th>
                                            <th>{item.branch}</th>
                                            <th>{item.tellPhone}</th>
                                            <th>{item.cellPhone}</th>
                                            <th>{item.email}</th>
                                            <th>{item.sector}</th>
                                        </tr>
                                    ))}
                                </th>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {showContactData && (
                <div className='TContacts'>
                    <br />
                    <h1>Contatos</h1>
                    <br />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Ramal</th>
                                <th>Telefone</th>
                                <th>Celular</th>
                                <th>Email</th>
                                <th>Setor</th>
                            </tr>
                        </thead>

                        <tbody className='dados'>
                            {data.map(user => (
                                <tr>
                                    <th>{user.id}</th>
                                    <th>{user.name}</th>
                                    <th>{user.branch}</th>
                                    <th>{user.tellPhone}</th>
                                    <th>{user.cellPhone}</th>
                                    <th>{user.email}</th>
                                    <th>{user.sector}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div> //user-container
    );
}

export default Contact;