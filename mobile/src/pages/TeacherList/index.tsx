import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import PageHeader from '../../components/PageHeaders';
import TeacherItem from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons';
import styles from './styles';


function TeacherList(){
   const[isFiltersVisible, setIsFiltersVisible] = useState(false);
   function handleToggleFiltersVisible(){
       setIsFiltersVisible(!isFiltersVisible);
   }
    return(
        <View style={styles.container}>
            <PageHeader 
            title="Proffy's disponíveis" 
            headerRight={(
                <BorderlessButton>
                    <Feather onPress={handleToggleFiltersVisible} name='filter' size={20} color="#FFF" />
                </BorderlessButton>
            )}>
               {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                        style={styles.input}
                        placeholder="Matéria"
                        placeholderTextColor = "#c1bccc" 
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="Dia ?" 
                                placeholderTextColor = "#c1bccc"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="Horário ?" 
                                placeholderTextColor = "#c1bccc"
                                />
                            </View>
                        </View>
                        <RectButton style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal:16,
                paddingBottom:16,
            }}
            >
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </ScrollView>
        </View>
    ); 
}

export default TeacherList;