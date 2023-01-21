//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import Footer from '../components/footer';
import { Header, PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { label } from '../utils/labels';

import { useForm, Controller } from 'react-hook-form';
import { minLengthValidation, numberValidation, requiredValidation } from '../utils/validationConfig';
import { SingleSelectDropDown } from '../components/dropDown';
import { allowedFileFormates, listOfPaymentMode, monthList, defaultImage, dfaultNoImage, houseNoMoc, idCardListMoc } from '../utils/config';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { changeSpinnerFlag } from '../commonfunctions/commonMethods';
import { createSettlement, getHouseList, getTenantList } from '../commonfunctions/firebaseMethods';
import { useIsFocused } from '@react-navigation/native';

// create a component
const SettlementScreen = () => {

    const currentDate = moment(new Date()).format("DD/MM/YYYY");

    console.log(currentDate)
    const [date, setDate] = useState(currentDate)
    const [showDate, setShowDate] = useState(false)
    const [listOfHouseNo, setHouseNoList] = useState([])
    const [tenantList, setTenantList] = useState([])
    const [selectedTenant, setSelectedTenant] = useState({})

    const formKeys = {
        tPNo: 'tpNO',
        houseNo: "houseNo",

        deduction: "deduction",
        reason: "reason",

        date: "date",
        paymentMode: "paymentMode",
        returnAmount: "returnAmount",
        receivedBy: 'receivedBy'
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
        formKeys.tPNo,
        formKeys.houseNo,

        formKeys.deduction,
        formKeys.reason,
        formKeys.date,
        formKeys.paymentMode,
        formKeys.returnAmount,
        formKeys.receivedBy
    ]


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


    const showDatePickerView = () => {
        return (
            <DateTimePickerModal
                testID="dateTimePicker"
                date={
                    date ? moment(date, 'DD/MM/YYYY').toDate() : currentDate
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
        setDate(newDate)
        setShowDate(false)
    };

    const onCancel = () => {
        setShowDate(false)
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



    const getListOfTenant = async () => {

        changeSpinnerFlag(true)
        const result = await getTenantList(1)
        changeSpinnerFlag(false)

        if (result.status) {
            setTenantList(result.data)
        } else {
            alert(result.message)
        }
    }


    const onValid = async (details) => {
        details["houseNo"] = details.houseNo.id
        details["id"] = new Date().getTime()
        details["paymentMode"] = details.paymentMode.id
        details["tenantDetails"] = selectedTenant
        changeSpinnerFlag(true)
        const result = await createSettlement(details, 1)
        changeSpinnerFlag(false)

        if (result.status) {
            reset(requiredFields)
            alert(result.message)
        } else {
            alert(result.message)
        }
    }


    const isFocused = useIsFocused()
    useEffect(() => {
        getHouseListDetails()
        getListOfTenant()
    }, [isFocused])

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
            // setSelectedDetails(list)
        } else {
            setHouseNoList([])
        }
    }
    

    const findTenant =(hNo)=>{
        for (const obj of tenantList) {
            if (obj.houseNo == hNo.id) {
                console.log(obj)
                setValue(formKeys.tPNo,obj.tpNO)
                setSelectedTenant(obj)
            }
        }
    }

    return (
        <View style={styles.container}>
            <PageHeader title={label.Settlement} />
            <ScrollView>
                <View style={{ flex: 1, paddingBottom: 60, paddingHorizontal: 20 }}>


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
                        name={formKeys.houseNo}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <SingleSelectDropDown optionList={listOfHouseNo} label={label.houseNo} onChange={(item)=>{
                                    onChange(item)
                                    findTenant(item)
                                    }} value={value} />
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




                    {/* <Controller
                        name={formKeys.rentOfMonth}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <SingleSelectDropDown optionList={monthList} label={label.rentOfMonth} onChange={onChange} value={value} />
                                {
                                    errors[formKeys.rentOfMonth] ?
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors[formKeys.rentOfMonth]?.message}</Text> : null
                                }
                            </>
                        )}
                        rules={{
                            required: requiredValidation(label.houseNo),
                        }}
                    /> */}


                    <Controller
                        name={formKeys.deduction}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.deduction, value, onChange, formKeys.deduction)
                        )}
                        rules={{
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.deduction),
                        }}
                    />

                    <Controller
                        name={formKeys.reason}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.reason, value, onChange, formKeys.reason)
                        )}
                        rules={{
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.reason),
                        }}
                    />


                    <Controller
                        name={formKeys.paymentMode}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <SingleSelectDropDown optionList={listOfPaymentMode} label={label.paymentMode} onChange={onChange} value={value} />
                                {
                                    errors[formKeys.paymentMode] ?
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors[formKeys.paymentMode]?.message}</Text> : null
                                }
                            </>
                        )}
                        rules={{
                            required: requiredValidation(label.paymentMode),
                        }}
                    />


                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 12 }}>{label.date}{" :"}</Text>
                        <TouchableOpacity style={styles.datePickerStyle} onPress={() => { setShowDate(!showDate) }} >
                            <Text>{date}</Text>
                            <Image source={require("../../assets/images/downIcon.png")} style={{ height: 20, width: 20, tintColor: "#bbb" }} />
                        </TouchableOpacity>
                    </View>


                    <Controller
                        name={formKeys.returnAmount}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.returnAmount, value, onChange, formKeys.returnAmount)
                        )}
                        rules={{
                            validate: { numberValidation },
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.returnAmount),
                        }}
                    />

<Controller
                        name={formKeys.receivedBy}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            textBoxView(label.receivedBy, value, onChange, formKeys.receivedBy)
                        )}
                        rules={{
                            // validate: { numberValidation },
                            minLength: minLengthValidation(3),
                            required: requiredValidation(label.receivedBy),
                        }}
                    />


                    <TouchableOpacity onPress={handleSubmit(onValid)}
                        style={styles.buttonStyle}><Text style={styles.buttonTxtStyle}>{"Submit Details"}</Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>
            {
                showDate ?
                    showDatePickerView()
                    : null
            }
            {/* <Footer /> */}
        </View>
    );
};

//make this component available to the app
export default SettlementScreen;

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
    datePickerStyle: {
        flexDirection: "row",
        alignItems: 'flex-end',
        height: 30,
        padding: 0,
        borderBottomColor: colors.backgroundColor,
        borderBottomWidth: 1,
        justifyContent: "space-between"
    },
    buttonStyle: {
        marginVertical: 15,
        backgroundColor: colors.subTheme, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6, alignItems: "center", alignSelf: "center"
    },
    buttonTxtStyle: {
        fontSize: 16, fontWeight: "bold"
    },
});