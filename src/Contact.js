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
    const [showElements, setShowElements] = useState(false);

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

    // function showList() {
    //     var ver = document.querySelector('#ver');
    //     // var dados = document.querySelector('.lista p')
    //     ver.addEventListener('click', function () {
    //         var conteudo = document.querySelector('.lista p');

    //         if (conteudo.classList.contains('mostrar')) {
    //             ver.innerHTML = 'Ver mais';
    //             conteudo.classList.remove('.mostrar');
    //         }
    //         else {
    //             ver.innerHTML = 'Ver menos';
    //             conteudo.classList.add('mostrar');
    //         }
    //     });
    // }

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

    const toggleShowElement = (sector) => {
        setShowElements(prevState => ({
            ...prevState,
            [sector]: !prevState[sector]
        }));
    };

    return (
        <div className="user-container">
            <br />
            <header>
                <img src={logoPhonebook} alt='Phonebook'></img>
                <h1>Agenda de colaboradores</h1>
            </header>
            <div className="btn-sort">
                <button onClick={toggleContactData}>
                    {showContactData ? 'Recolher contatos' : 'Exibir contatos'}</button>
                <button onClick={() => sortBy('name')}>Ordenar por Nome</button>
                <button onClick={() => sortBy('sector')}>Ordenar por Setor</button>
                <button onClick={toggleGroupedData}>
                    {showGroupedData ? 'Recolher grupos' : 'Agrupar por setor'}
                </button>
                <input type="search" id="busca" onChange={(e) => setSearch(search)} />
            </div>
            {showGroupedData > 0 && (
                <div className='SContacts'>
                    <br />
                    <h1>Contatos agrupados por setor</h1>
                    <br />
                    <table className='lista'>
                        {Object.entries(groupedData).map(([sector, items]) => (
                            <Sector key={sector} sector={sector} items={items} showElement={showElements[sector]} toggleShowElement={() => toggleShowElement(sector)} />
                        ))}
                    </table>
                </div>
            )}

            {showContactData > 0 && (
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

function Sector({ sector, items, showElement, toggleShowElement }) {
    return (
        <tbody className='SList'>
            <tr className='setor'>
                <td>{sector}</td>
                <td><button id='ver' onClick={toggleShowElement}>
                    {showElement ? 'Ver menos' : 'Ver mais'}
                </button></td>
            </tr>
            {showElement && (
                
                <tr className='lista'>
                    {items.map(item => (
                        <td key={item.id}>
                            <p>{item.id}</p>
                            <p>{item.name}</p>
                            <p>{item.branch}</p>
                            <p>{item.tellPhone}</p>
                            <p>{item.cellPhone}</p>
                            <p>{item.email}</p>
                        </td>
                    ))}
                </tr>
            )}
        </tbody>
    );
}

export default Contact;