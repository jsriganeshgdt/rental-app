import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { label } from '../utils/labels';
import { useForm, Controller } from 'react-hook-form';
import { minLengthValidation, numberValidation, requiredValidation } from '../utils/validationConfig';
import { SingleSelectDropDown } from '../components/dropDown';
import { allowedFileFormates, defaultImage, dfaultNoImage, houseNoMoc, houseStatus, idCardListMoc } from '../utils/config';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import database from '@react-native-firebase/database';
import { changeSpinnerFlag } from '../commonfunctions/commonMethods';
import { createHouse, getHouseList, updateHouse } from '../commonfunctions/firebaseMethods';


export const CreateHouse = (props) => {
    const currentDate = moment(new Date()).format("DD/MM/YYYY");
    var selectedDetails = props?.route?.params?.selectedDetails ? props.route.params.selectedDetails : {}
    // const [dateOfOccupy, setDateOfOccupy] = useState(currentDate)
    // const [showDateOfOccupy, setShowDateOfOccupy] = useState(false)



    const [houseImage, setHouseImage] = useState("")

    const formKeys = {
        houseNo: 'houseNo',
        address: 'address',
        nameOfBuilding: 'nameOfBuilding',
        rent: "rent",
        status: 'status',
        houseImage: 'houseImage'

    }



    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm();


    const requiredFields = [
        formKeys.houseNo,
        formKeys.address,
        formKeys.nameOfBuilding,
        formKeys.rent,
        formKeys.status
    ];

    const setSelectedDetails = () => {

        if(Object.keys(selectedDetails).length  > 0){
            var statusIs = selectedDetails.status == 1 ? houseStatus[0] : houseStatus[1]
            setValue(formKeys.houseNo, selectedDetails[formKeys.houseNo])
            setValue(formKeys.address, selectedDetails[formKeys.address])
            setValue(formKeys.nameOfBuilding, selectedDetails[formKeys.nameOfBuilding])
            setValue(formKeys.rent, selectedDetails[formKeys.rent])
            setValue(formKeys.status, statusIs)
            // setValue(formKeys.houseImage, houseImage)
            setHouseImage(selectedDetails[formKeys.houseImage])
        }else{
            setValue(formKeys.status, houseStatus[0])
        }
    }

    useEffect(() => {
        setSelectedDetails()
    }, [])

    const isRquiredFilled = () => {
        var values = watch(requiredFields);
        var isFilled = true;
        values.map(value =>
            value == undefined || value == '' || value == null
                ? (isFilled = false)
                : null,
        );
        return isFilled;
    };


    const textBoxView = (label, value, onchange, formKeys, maxLength = 150) => {
        return (
            <View style={{ marginVertical: 5 }}>
                <Text style={{ fontSize: 12 }}>{label}{" :"}</Text>
                <TextInput maxLength={maxLength ? maxLength : null} style={styles.textBoxStyle} value={value} onChangeText={(txt) => { onchange(txt) }} />
                {
                    errors[formKeys] ?
                        <Text style={{ color: "red", fontSize: 12 }}>{errors[formKeys]?.message}</Text> : null
                }
            </View>
        )
    }

    const onValid = async (details) => {
        try {
        details["status"] = details.status.id
        details["id"] = new Date().getTime()
        details["houseImage"] = houseImage
        changeSpinnerFlag(true)
        const result = await createHouse(details, 1)
        changeSpinnerFlag(false)

        if (result.status) {
            reset(requiredFields)
        } else {
            alert(result.message)
        }
    } catch (error) {
        changeSpinnerFlag(false)
    }
    }


    const updateDetails = async (details) => {
        details["status"] = details.status.id
        details["id"] = selectedDetails.id
        details["key"] = selectedDetails.key
        details["houseImage"] = houseImage
        changeSpinnerFlag(true)
        const result = await updateHouse(details, 1)
        changeSpinnerFlag(false)

        if (result.status) {
            reset(requiredFields)
        } else {
            alert(result.message)
        }
    }

    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
        }))
  

    const chooseFile = async () => {
        try {
            const file = await DocumentPicker.pickSingle({
                type: allowedFileFormates,
                copyTo: 'cachesDirectory',
            });
            var path = file.fileCopyUri;
            // console.log(path)

            

            toDataURL(path)
                .then(dataUrl => {
                    // console.log('RESULT:', dataUrl)
                    setHouseImage(dataUrl)
                })


            //   const result = await RNFetchBlob.fs.readFile(path, 'base64');
            //   checkDocumentIsAlreadyUploaded(result, file)
        } catch (err) {
            //   setShowDocumentUploadingFlag(false)
            console.log(err);
            throw err;
        }
    };

    return (
        <View style={styles.container}>
            <PageHeader title={label.CreateHouse} />
            <ScrollView nestedScrollEnabled={true}>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>


                    <View style={{ alignItems: "center" }}>
                        <Image
                            // resizeMode="center"
                            style={{ width: "90%", height: 180, borderRadius: 6, marginVertical: 10 }}
                            source={{ uri: houseImage ? houseImage : dfaultNoImage }}
                        />

                        <TouchableOpacity
                            onPress={() => { chooseFile() }}
                            style={{ backgroundColor: "#bbb", justifyContent: "center", alignItems: "center", alignContent: "center", alignSelf: "center", borderRadius: 6, paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ color: colors.white, fontWeight: "bold" }}>{"Upload TenantImage"}</Text>
                        </TouchableOpacity>
                    </View>

                    <Controller
                        name={formKeys.houseNo}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.houseNo, value, onChange, formKeys.houseNo,4)
                        )}
                        rules={{
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.houseNo),
                        }}
                    />


                    <Controller
                        name={formKeys.address}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.address, value, onChange, formKeys.address, 100)
                        )}
                        rules={{
                            // validate: { numberValidation },
                            minLength: minLengthValidation(10),
                            required: requiredValidation(label.address),
                        }}
                    />

                    <Controller
                        name={formKeys.nameOfBuilding}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.nameOfBuilding, value, onChange, formKeys.nameOfBuilding)
                        )}
                        rules={{
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.nameOfBuilding),
                        }}
                    />

                    <Controller
                        name={formKeys.status}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <SingleSelectDropDown optionList={houseStatus} label={label.status} onChange={onChange} value={value} />
                                {
                                    errors[formKeys.status] ?
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors[formKeys.status]?.message}</Text> : null
                                }
                            </>
                        )}
                        rules={{
                            required: requiredValidation(label.tenantIdCardType),
                        }}
                    />

                    <Controller
                        name={formKeys.rent}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.rent, value, onChange, formKeys.rent)
                        )}
                        rules={{
                            validate: { numberValidation },
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.rent),
                        }}
                    />



                    <TouchableOpacity
                        onPress={handleSubmit(Object.keys(selectedDetails).length > 0 ? updateDetails : onValid)}
                        style={styles.buttonStyle}><Text style={styles.buttonTxtStyle}>{"Submit House Details"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    textBoxStyle: {
        height: 30,
        padding: 0,
        borderBottomColor: colors.backgroundColor,
        borderBottomWidth: 1
    },
    buttonStyle: {
        marginVertical: 15,
        backgroundColor: colors.subTheme, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6, alignItems: "center", alignSelf: "center"
    },
    buttonTxtStyle: {
        fontSize: 16, fontWeight: "bold"
    },

    datePickerStyle: {
        flexDirection: "row",
        alignItems: 'flex-end',
        height: 30,
        padding: 0,
        borderBottomColor: colors.backgroundColor,
        borderBottomWidth: 1,
        justifyContent: "space-between"
    },
});