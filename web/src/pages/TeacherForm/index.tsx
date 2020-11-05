import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import warningIcon from '../../assets/images/icons/warning.svg';
import './style.css';




function TeacherFrom(){
  const history = useHistory();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');  
  const [whatsapp, setWhatsapp] = useState('');  
  const [bio, setBio] = useState(''); 
  const [subject, setSubject] = useState(''); 
  const [cost, setCost] = useState('');   

  const [scheduleItems, setScheduleItems] = useState([
    {week_day:1,from:'',to:''}
  ]);
  function addNewScheduleItem(){
    setScheduleItems([
      ...scheduleItems,
      {week_day:1,from:'',to:''}
    ]);
  }
  function setScheduleItemValue(posItem:number, field:string, value:string){
    const updateSchedule = scheduleItems.map((scheduleItem, index)=>{
          if(index === posItem){
            return {...scheduleItem, [field]: value};
          }

          return scheduleItem;
    });
    setScheduleItems(updateSchedule);
  }
  function handleCreateClass(e:FormEvent){
    e.preventDefault();

    api.post('classes',{
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost:Number(cost),
      schedule:scheduleItems
    }).then(()=>{
      alert('Cadastro realizado com suceso!');
      history.push('/');
    }).catch(()=>{
      alert('Erro no cadastro!');
    });
    
  }
    return(
      <div id="page-teachers-form" className="container">
          <PageHeader 
          title ="Que incrivel que você quer dar aulas"
          description = "O 1º passo é preencher este Formulario de inscrição" />
      
        <main>
          <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>  
            <Input name="name" label="Nome Completo" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <Input name="avatar" label="Avatar" type="text" value={avatar} onChange={(e)=>{setAvatar(e.target.value)}} />
            <Input name="whatsapp" label="WhatsApp" type="text" value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}} />
            <Textarea name="bio" label="Biografia" value={bio} onChange={(e)=>{setBio(e.target.value)}} />        
          </fieldset>
          <fieldset>
            <legend>Sobre a Aula</legend>
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
            <Input name="cost" label="Valor da Hora/Aula" type="text" value={cost} onChange={(e)=>{setCost(e.target.value)}}/>           
          </fieldset>
          <fieldset>
            <legend>Horários Disponíveis <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button></legend>
            {scheduleItems.map((scheduleItem, index) =>{ 
              return (
              <div key={scheduleItem.week_day} className="schedule-item">
              <Select 
                        name="week_day" 
                        label="Dia da Semana"
                        onChange = {e => setScheduleItemValue(index, 'week_day', e.target.value)} 
                        value={scheduleItem.week_day}
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
                <Input name="From" label="De" type="time" value={scheduleItem.from} onChange = {e => setScheduleItemValue(index, 'from', e.target.value)} />
                <Input name="To" label="Até" type="time" value={scheduleItem.to} onChange = {e => setScheduleItemValue(index, 'to', e.target.value)} />          
              </div>);
            })}
          </fieldset>
          
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type='submit'>
              Salvar Cadastro
            </button>
          </footer>
          </form>
        </main>
      </div>
    )
}

export default TeacherFrom;