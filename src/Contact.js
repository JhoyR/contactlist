import './App';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import logoPhonebook from './assets/phonebook.png'


function Contact() {

    const baseURL = "https://localhost:7094/Contact";
    const [updateData, setUpdateData] = useState(true);
    const [data, setData] = useState([]);
    const [contacts, setContacts] = useState(data);

    const getOrder = async () => {
        await axios.get(baseURL)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    function sortBy(field) {
        const sortedContacts = Array.from(contacts).sort((a, b) => a[field] < b[field] ? -1 : 1);
        setContacts(sortedContacts);
    }

    function groupBy(field) {
        const groupedContacts = [...data].reduce((groups, contact) => {
            const group = contact[field];
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(contact);
            return groups;
        }, {});
        setContacts(groupedContacts);
    }

    useEffect(() => {
        if (updateData) {
            getOrder();
            setUpdateData(false);
        }
    }, [contacts, updateData]);

    function ContactItem(props) {
        const { id, name, branch, tellPhone, cellPhone, email, sector } = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{branch}</td>
                <td>{tellPhone}</td>
                <td>{cellPhone}</td>
                <td>{email}</td>
                <td>{sector}</td>
            </tr>
        );
    }


    return (
        <div className="user-container">
            <br />
            <header>
                <img src={logoPhonebook} alt='Phonebook'></img>
                <h1>Agenda de colaboradores</h1>
            </header>
            <div className="btn-sort">
                <button onClick={() => sortBy('name')}>Ordenar por Nome</button>
                <button onClick={() => sortBy('sector')}>Ordenar por Setor</button>
                <button onClick={() => groupBy('sector')}>Agrupar por Setor</button>
                {Array.isArray(contacts) ? (
                    contacts.map(contact => <ContactItem key={contact.id} {...contact} />)
                ) : (
                    Object.keys(contacts).map(group => (
                        <div key={group}>
                            <h2>{group}</h2>
                            {Array.isArray(contacts[group]) ? contacts[group].map(contact => <ContactItem key={contact.id} {...contact} />) : null}
                        </div>
                    ))
                )}
            </div>
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
                        // <tr key={user.id}>
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
        </div> //user-container
    );
}

export default Contact;