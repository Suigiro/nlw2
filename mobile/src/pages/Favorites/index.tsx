import React from 'react'
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PageHeader from '../../components/PageHeaders';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem from '../../components/TeacherItem';
import styles from './styles';



function Favorites(){
    const navigation = useNavigation();
    function handleNavigateToFavoritesPage(){
        navigation.navigate('Favorites');
    }
    return(
        <View style={styles.container}>
            <PageHeader title="Proffy's Favoritos" />
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

export default Favorites;