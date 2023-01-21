import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { label } from '../utils/labels';
import { useForm, Controller } from 'react-hook-form';
import { minLengthValidation, numberValidation, requiredValidation } from '../utils/validationConfig';
import { SingleSelectDropDown } from '../components/dropDown';
import { allowedFileFormates, defaultImage, dfaultNoImage, idCardListMoc } from '../utils/config';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { changeSpinnerFlag } from '../commonfunctions/commonMethods';
import { useIsFocused } from '@react-navigation/native';
import { createTenant, getHouseList, getTenantList, updateTenant } from '../commonfunctions/firebaseMethods';


export const CreateTenant = (props) => {
    const currentDate = moment(new Date()).format("DD/MM/YYYY");

    console.log(currentDate)
    const [listOfHouseNo, setHouseNoList] = useState([])
    const [dateOfOccupy, setDateOfOccupy] = useState(currentDate)
    const [showDateOfOccupy, setShowDateOfOccupy] = useState(false)
    const [tImage, setTImage] = useState("")


    var selectedDetails = props?.route?.params?.selectedDetails ? props.route.params.selectedDetails : {}


    const formKeys = {
        tName: 'tName',
        tPNo: 'tpNO',
        address: 'adress',
        idCardType: 'idCardType',
        idCardNo: 'idCardNo',
        dateOfOccupy: 'dateOfOccupy',
        houseNo: "houseNo",
        rent: "rent",
        advance: 'advance',
        tenantImage: 'tenantImage'
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
        formKeys.tName,
        formKeys.tPNo,
        formKeys.address,
        formKeys.idCardType,
        formKeys.idCardNo,
        formKeys.dateOfOccupy,
        formKeys.houseNo,
        formKeys.rent,
        formKeys.advance,
    ];

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

    const idCardList = (id) => {
        for (const obj of idCardListMoc) {
            if (obj.id == id) {
                return obj
            }
        }
    }

    const findHouseList = (id) => {
        for (const obj of listOfHouseNo) {
            if (obj.id == id) {
                return obj
            }
        }
    }


    const setSelectedDetails = async (hList) => {


        var selectedIdCard = idCardList(selectedDetails[formKeys.idCardType])
        // var selectedHouse =  findHouseList(selectedDetails[formKeys.houseNo])

        var idCardType = selectedIdCard?.id ? selectedIdCard : {}
        // var houseNo = selectedHouse?.id  ? selectedHouse : {}


        setValue(formKeys.idCardType, idCardType)


        // setValue(formKeys.nameOfBuilding, selectedDetails[formKeys.nameOfBuilding])
        setValue(formKeys.tName, selectedDetails[formKeys.tName])
        setValue(formKeys.tPNo, selectedDetails[formKeys.tPNo])
        setValue(formKeys.address, selectedDetails[formKeys.address])
        setValue(formKeys.idCardNo, selectedDetails[formKeys.idCardNo])
        setValue(formKeys.dateOfOccupy, selectedDetails[formKeys.dateOfOccupy])
        setValue(formKeys.rent, selectedDetails[formKeys.rent])
        setValue(formKeys.advance, selectedDetails[formKeys.advance])
        setTImage(selectedDetails[formKeys.tenantImage])


        for (const obj of hList) {
            if (obj.id == selectedDetails[formKeys.houseNo]) {
                console.log("houseNo" + JSON.stringify(obj))
                setValue(formKeys.houseNo, obj)
            }
        }
    }

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

    const chooseFile = async () => {
        try {
            const file = await DocumentPicker.pickSingle({
                type: allowedFileFormates,
                copyTo: 'cachesDirectory',
            });
            var path = file.fileCopyUri;
            console.log(path)
            setTImage(path)
            //   const result = await RNFetchBlob.fs.readFile(path, 'base64');
            //   checkDocumentIsAlreadyUploaded(result, file)
        } catch (err) {
            //   setShowDocumentUploadingFlag(false)
            console.log(err);
            throw err;
        }
    };


    const showDatePickerView = () => {
        return (
            <DateTimePickerModal
                testID="dateTimePicker"
                date={
                    dateOfOccupy ? moment(dateOfOccupy, 'DD/MM/YYYY').toDate() : currentDate
                }
                isVisible={true}
                mode={'date'}
                is24Hour={false}
                display={Platform.OS == 'android' ? 'default' : 'spinner'}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        )
    }

    const onConfirm = (event) => {
        var newDate = moment(event).format('DD/MM/YYYY');
        setDateOfOccupy(newDate)
        setShowDateOfOccupy(false)
    };

    const onCancel = () => {
        setShowDateOfOccupy(false)
    };



    const getHouseListDetails = async () => {
        changeSpinnerFlag(true)
        const houseList = await getHouseList(1)
        changeSpinnerFlag(false)
        // console.log(houseList)
        if (houseList.status && houseList.data && houseList.data.length > 0) {

            var list = []
            for (const obj of houseList.data) {
                list.push({ id: obj.key, name: obj.houseNo })
            }

            setHouseNoList(list)
            setSelectedDetails(list)
        } else {
            setHouseNoList([])
        }
    }


    const isFocused = useIsFocused()

    useEffect(() => {
        getHouseListDetails()

    }, [isFocused])

    const onValid = async (details) => {
        console.log(details)
        details["houseNo"] = details.houseNo.id
        details["idCardType"] = details.idCardType.id
        details["id"] = new Date().getTime()
        details["tenantImage"] = tImage
        changeSpinnerFlag(true)
        const result = await createTenant(details, 1)
        changeSpinnerFlag(false)

        if (result.status) {
            reset(requiredFields)
        } else {
            alert(result.message)
        }
    }


    const updateDetails = async (details) => {
        details["houseNo"] = details.houseNo.id
        details["idCardType"] = details.idCardType.id

        details["id"] = selectedDetails.id
        details["key"] = selectedDetails.key
        details["tenantImage"] = tImage

        // details["created_at"] = new Date()
        changeSpinnerFlag(true)
        const result = await updateTenant(details, 1)
        if (result.status) {
            changeSpinnerFlag(false)
            getListOfTenant(details.id,details.houseNo)
            reset(requiredFields)
        } else {
            changeSpinnerFlag(false)
            alert(result.message)
        }
    }

    const getListOfTenant=async(tId,hNo)=>{
    
        changeSpinnerFlag(true)
        const result = await getTenantList(1)
        changeSpinnerFlag(false)
     
        if (result.status) {
         
            for (const obj of result.data) {
                if(obj.id == tId || obj.houseNo != hNo){

                }else if(obj.id != tId && obj.houseNo == hNo){
                    var details = obj
                    details["houseNo"] = ''
                    const result = await updateTenant(details, 1)

                    if (result.status) {
                        alert(result.message)
                    } else {
                        alert(result.message)
                    }
                }
            }
       } else {
        //   alert(result.message)
        }
       }
     

    return (
        <View style={styles.container}>
            <PageHeader title={label.CreateTenant} />
            <ScrollView nestedScrollEnabled={true}>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>


                    <View style={{ alignItems: "center" }}>
                        <Image
                            // resizeMode="center"
                            style={{ width: "90%", height: 180, borderRadius: 6, marginVertical: 10 }}
                            source={{ uri: tImage ? tImage : dfaultNoImage }}
                        />

                        <TouchableOpacity
                            onPress={() => { chooseFile() }}
                            style={{ backgroundColor: "#bbb", justifyContent: "center", alignItems: "center", alignContent: "center", alignSelf: "center", borderRadius: 6, paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ color: colors.white, fontWeight: "bold" }}>{"Upload TenantImage"}</Text>
                        </TouchableOpacity>
                    </View>

                    <Controller
                        name={formKeys.tName}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.tenantName, value, onChange, formKeys.tName)
                        )}
                        rules={{
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.tenantName),
                        }}
                    />
                    <Controller
                        name={formKeys.tPNo}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.tenantPhoneNo, value, onChange, formKeys.tPNo, 10)
                        )}
                        rules={{
                            validate: { numberValidation },
                            minLength: minLengthValidation(10),
                            required: requiredValidation(label.tenantPhoneNo),
                        }}
                    />

                    <Controller
                        name={formKeys.address}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.tenantAddress, value, onChange, formKeys.address)
                        )}
                        rules={{
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.tenantAddress),
                        }}
                    />

                    <Controller
                        name={formKeys.idCardType}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <SingleSelectDropDown optionList={idCardListMoc} label={label.tenantIdCardType} onChange={onChange} value={value} />
                                {
                                    errors[formKeys.idCardType] ?
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors[formKeys.idCardType]?.message}</Text> : null
                                }
                            </>
                        )}
                        rules={{
                            required: requiredValidation(label.tenantIdCardType),
                        }}
                    />

                    <Controller
                        name={formKeys.idCardNo}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.cardNo, value, onChange, formKeys.idCardNo)
                        )}
                        rules={{
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.cardNo),
                        }}
                    />

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 12 }}>{label.dateOfOccupy}{" :"}</Text>
                        <TouchableOpacity style={styles.datePickerStyle} onPress={() => { setShowDateOfOccupy(!showDateOfOccupy) }} >
                            <Text>{dateOfOccupy}</Text>
                            <Image source={require("../../assets/images/downIcon.png")} style={{ height: 20, width: 20, tintColor: "#bbb" }} />
                        </TouchableOpacity>
                    </View>


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


                    <Controller
                        name={formKeys.advance}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.advance, value, onChange, formKeys.advance)
                        )}
                        rules={{
                            validate: { numberValidation },
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.advance),
                        }}
                    />



                    <Controller
                        name={formKeys.houseNo}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <SingleSelectDropDown optionList={listOfHouseNo} label={label.houseNo} onChange={onChange} value={value} />
                                {
                                    errors[formKeys.houseNo] ?
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors[formKeys.houseNo]?.message}</Text> : null
                                }
                            </>
                        )}
                        rules={{
                            required: requiredValidation(label.houseNo),
                        }}
                    />




                    {/* 
                    {textBoxView(label.dateOfOccupy)}
                    */}

                    <TouchableOpacity onPress={handleSubmit(Object.keys(selectedDetails).length > 0 ? updateDetails : onValid)}
                        // handleSubmit(onValid)
                        style={styles.buttonStyle}><Text style={styles.buttonTxtStyle}>{"Submit Tenant Details"}</Text>
                    </TouchableOpacity>
                </View>

                {
                    showDateOfOccupy ?
                        showDatePickerView()
                        : null
                }
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