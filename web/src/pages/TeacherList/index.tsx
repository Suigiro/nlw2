import React, { useState, FormEvent } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import './style.css';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList(){
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');
    const [teachers,setTeachers] = useState([]);
    async function searchTeacher(e:FormEvent){
        e.preventDefault();

        const response = await api.get('classes',{
            params:{
                subject,
                week_day,
                time,
            }
        });
        
        setTeachers(response.data);
    }
    return(
        <div id="page-teachers-list" className="container">
           <PageHeader title="Estes são os proffys disponíveis." >
                <form id="search-teachers" onSubmit={searchTeacher}>
                <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e)=>{setSubject(e.target.value)}}
                        options={[
                            {value:'Hipnose',label:'Hipnose'},
                            {value:'TerapiaInteg',label:'Terapia integrativa'},
                            {value:'Erickson',label:'Hipnose de Erickson'},
                            {value:'Palco',label:'Hipnose de Palco'},
                            {value:'Rua',label:'Hipnose de Rua'}
                        ]}
                />
                <Select 
                        name="week_day" 
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e)=>{setWeek_day(e.target.value)}}
                        options={[
                            {value:'1',label:'Domingo'},
                            {value:'2',label:'Segunda Feira'},
                            {value:'3',label:'Terça Feira'},
                            {value:'4',label:'Quarta Feira'},
                            {value:'5',label:'Quinta Feira'},
                            {value:'6',label:'Sexta Feira'},
                            {value:'7',label:'Sábado'}
                        ]}
                />                    
                    <Input name="time" label="Hora" type="time" value={time} onChange={(e)=>{setTime(e.target.value)}} />
                <button type='submit'>Buscar</button>
                </form>
           </PageHeader>
           <main>
               {teachers.map((teacher: Teacher) => {
                   return <TeacherItem key={teacher.id} teacher={teacher} />
               })}               
              
           </main>
        </div>
        )
}

export default TeacherList;