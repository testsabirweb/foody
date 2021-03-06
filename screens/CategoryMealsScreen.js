import React from 'react';
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector((state) => {
    return state.meals.filteredMeals
  })

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.noMealFound}>
        <DefaultText>No meals found!!! maybe check the filters</DefaultText>
      </View>
    )
  }
  return (
    <MealList listData={displayedMeals} navigation={props.navigation} />
  );
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};
const styles = StyleSheet.create({
  noMealFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default CategoryMealScreen;
