import React, {useState, createContext, useContext} from 'react';

export const AnnotationContext = createContext();

export const AnnotationProvider = props => {

    const [imageAnnotation, setImageAnnotation] = useState({});

    const value = {
        imageAnnotation, 
        setImageAnnotation,
    };

    return (
        <AnnotationContext.Provider value={value}>
            {props.children}
        </AnnotationContext.Provider>
    );
}

export const useAnnotationContext = () => useContext(AnnotationContext);