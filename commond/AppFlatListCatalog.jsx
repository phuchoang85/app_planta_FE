import { View, Text, FlatList } from 'react-native'
import React from 'react'

const AppFlatListCatalog = (props) => {
    const { data,renderitem } = props
    return (
        <View>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={item => item._id}
                renderItem={renderitem}
            />
        </View>
    )
}

export default AppFlatListCatalog