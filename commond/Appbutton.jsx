import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Appbutton = (props) => {
    const { text, styles, event, stylettext } = props;
    return (
        <TouchableOpacity
            style={styles}
                onPress={event}
            >
                {text &&
                    <Text style={stylettext}>
                        {text}
                    </Text>}
            </TouchableOpacity>
    )
}

export default Appbutton