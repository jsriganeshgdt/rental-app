//import liraries
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import Footer from "../components/footer";
import { Header, PageHeader } from "../components/header";
import { colors } from "../utils/colors";
import { label } from "../utils/labels";

import { useForm, Controller } from "react-hook-form";
import {
  minLengthValidation,
  numberValidation,
  requiredValidation,
} from "../utils/validationConfig";
import { SingleSelectDropDown } from "../components/dropDown";
import {
  allowedFileFormates,
  listOfPaymentMode,
  monthList,
  defaultImage,
  dfaultNoImage,
  houseNoMoc,
  idCardListMoc,
} from "../utils/config";
import moment from "moment";
import DocumentPicker from "react-native-document-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  createPayment,
  getHouseList,
  getTenantList,
} from "../commonfunctions/firebaseMethods";
import { useIsFocused } from "@react-navigation/native";
import { changeSpinnerFlag } from "../commonfunctions/commonMethods";
import SmsAndroid from "react-native-get-sms-android";
// create a component
const PaymentScreen = () => {
  const currentDate = moment(new Date()).format("DD/MM/YYYY");

  console.log(currentDate);
  const [date, setDate] = useState(currentDate);
  const [showDate, setShowDate] = useState(false);
  const [listOfHouseNo, setHouseNoList] = useState([]);
  const [tenantList, setTenantList] = useState([]);

  const formKeys = {
    tName: "tName",
    houseNo: "houseNo",

    rentOfMonth: "rentOfMonth",
    paidBy: "paidBy",

    date: "date",
    paymentMode: "paymentMode",
    amount: "amount",
    receivedBy: "receivedBy",
  };

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
    formKeys.houseNo,
    formKeys.rentOfMonth,
    formKeys.paidBy,
    formKeys.date,
    formKeys.paymentMode,
    formKeys.amount,
    formKeys.receivedBy,
  ];

  const isFocused = useIsFocused();
  useEffect(() => {
    getHouseListDetails();
    getListOfTenant();
  }, [isFocused]);

  const getListOfTenant = async () => {
    changeSpinnerFlag(true);
    const result = await getTenantList(1);
    changeSpinnerFlag(false);
    console.log(" getTenantList ======", result);
    if (result.status) {
      if (result?.data && result?.data?.length > 0) {
        var list = [];
        for (const obj of result.data) {
          list.push({ id: obj.tpNO, name: obj.tName });
        }
        setTenantList(list);
      } else {
        setTenantList([]);
      }
    } else {
      //   alert(result.message)
    }
  };

  const getHouseListDetails = async () => {
    changeSpinnerFlag(true);
    const houseList = await getHouseList(1);
    changeSpinnerFlag(false);
    // console.log(houseList)
    if (houseList.status && houseList.data && houseList.data.length > 0) {
      var list = [];
      for (const obj of houseList.data) {
        list.push({ id: obj.key, name: obj.houseNo });
      }

      setHouseNoList(list);
      // setSelectedDetails(list)
    } else {
      setHouseNoList([]);
    }
  };

  const isRquiredFilled = () => {
    var values = watch(requiredFields);
    var isFilled = true;
    values.map((value) =>
      value == undefined || value == "" || value == null
        ? (isFilled = false)
        : null
    );
    return isFilled;
  };

  const showDatePickerView = () => {
    return (
      <DateTimePickerModal
        testID="dateTimePicker"
        date={date ? moment(date, "DD/MM/YYYY").toDate() : currentDate}
        isVisible={true}
        mode={"date"}
        is24Hour={false}
        display={Platform.OS == "android" ? "default" : "spinner"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );
  };

  const onConfirm = (event) => {
    var newDate = moment(event).format("DD/MM/YYYY");
    setDate(newDate);
    setShowDate(false);
  };

  const onCancel = () => {
    setShowDate(false);
  };

  const textBoxView = (label, value, onchange, formKeys, maxLength = 150) => {
    return (
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 12 }}>
          {label}
          {" :"}
        </Text>
        <TextInput
          maxLength={maxLength ? maxLength : null}
          style={styles.textBoxStyle}
          value={value}
          onChangeText={(txt) => {
            onchange(txt);
          }}
        />
        {errors[formKeys] ? (
          <Text style={{ color: "red", fontSize: 12 }}>
            {errors[formKeys]?.message}
          </Text>
        ) : null}
      </View>
    );
  };

  const onValid = async (details) => {
    console.log(details);

    console.log(details);
    details["houseNo"] = details.houseNo.id;
    // details["idCardType"] = details.idCardType.id
    details["id"] = new Date().getTime();
    details["paymentMode"] = details.paymentMode.id;
    details["rentOfMonth"] = details.rentOfMonth.id;
    changeSpinnerFlag(true);
    const result = await createPayment(details, 1);
    changeSpinnerFlag(false);

    if (result.status) {
      var messgae =
        "Hi " +
        details.tName.name +
        " your " +
        details.rentOfMonth.name +
        " month, rent " +
        details.amount +
        " paid by " +
        details.paidBy +
        ", and received by " +
        details.receivedBy +
        ". Payment method is " +
        details.paymentMode.name +
        ".";

      SmsAndroid.autoSend(
        details.tName.id,
        // "9688743938",
        messgae,
        (fail) => {
          console.log("message send error ---- " + JSON.stringify(fail));
        },
        (success) => {
          reset(requiredFields);
          console.log("message send success ---- " + JSON.stringify(success));
        }
      );
    } else {
      alert(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader title={label.payment} />
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: 60, paddingHorizontal: 20 }}>
          <Controller
            name={formKeys.houseNo}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <SingleSelectDropDown
                  optionList={listOfHouseNo}
                  label={label.houseNo}
                  onChange={onChange}
                  value={value}
                />
                {errors[formKeys.houseNo] ? (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {errors[formKeys.houseNo]?.message}
                  </Text>
                ) : null}
              </>
            )}
            rules={{
              required: requiredValidation(label.houseNo),
            }}
          />

          <Controller
            name={formKeys.tName}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <SingleSelectDropDown
                  optionList={tenantList}
                  label={label.Tenant}
                  onChange={onChange}
                  value={value}
                />
                {errors[formKeys.tName] ? (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {errors[formKeys.tName]?.message}
                  </Text>
                ) : null}
              </>
            )}
            rules={{
              required: requiredValidation(label.Tenant),
            }}
          />

          <Controller
            name={formKeys.rentOfMonth}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <SingleSelectDropDown
                  optionList={monthList}
                  label={label.rentOfMonth}
                  onChange={onChange}
                  value={value}
                />
                {errors[formKeys.rentOfMonth] ? (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {errors[formKeys.rentOfMonth]?.message}
                  </Text>
                ) : null}
              </>
            )}
            rules={{
              required: requiredValidation(label.houseNo),
            }}
          />

          <Controller
            name={formKeys.paidBy}
            control={control}
            render={({ field: { onChange, value } }) =>
              textBoxView(label.paidBy, value, onChange, formKeys.paidBy)
            }
            rules={{
              minLength: minLengthValidation(3),
              required: requiredValidation(label.paidBy),
            }}
          />

          <Controller
            name={formKeys.receivedBy}
            control={control}
            render={({ field: { onChange, value } }) =>
              textBoxView(
                label.receivedBy,
                value,
                onChange,
                formKeys.receivedBy
              )
            }
            rules={{
              minLength: minLengthValidation(3),
              required: requiredValidation(label.receivedBy),
            }}
          />

          <Controller
            name={formKeys.paymentMode}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <SingleSelectDropDown
                  optionList={listOfPaymentMode}
                  label={label.paymentMode}
                  onChange={onChange}
                  value={value}
                />
                {errors[formKeys.paymentMode] ? (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {errors[formKeys.paymentMode]?.message}
                  </Text>
                ) : null}
              </>
            )}
            rules={{
              required: requiredValidation(label.paymentMode),
            }}
          />

          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 12 }}>
              {label.date}
              {" :"}
            </Text>
            <TouchableOpacity
              style={styles.datePickerStyle}
              onPress={() => {
                setShowDate(!showDate);
              }}
            >
              <Text>{date}</Text>
              <Image
                source={require("../../assets/images/downIcon.png")}
                style={{ height: 20, width: 20, tintColor: "#bbb" }}
              />
            </TouchableOpacity>
          </View>

          <Controller
            name={formKeys.amount}
            control={control}
            render={({ field: { onChange, value } }) =>
              textBoxView(label.amount, value, onChange, formKeys.amount)
            }
            rules={{
              validate: { numberValidation },
              minLength: minLengthValidation(3),
              required: requiredValidation(label.amount),
            }}
          />

          <TouchableOpacity
            onPress={handleSubmit(onValid)}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTxtStyle}>{"Submit Details"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showDate ? showDatePickerView() : null}
      {/* <Footer /> */}
    </View>
  );
};

//make this component available to the app
export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textBoxStyle: {
    height: 30,
    padding: 0,
    borderBottomColor: colors.backgroundColor,
    borderBottomWidth: 1,
  },
  datePickerStyle: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 30,
    padding: 0,
    borderBottomColor: colors.backgroundColor,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  buttonStyle: {
    marginVertical: 15,
    backgroundColor: colors.subTheme,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonTxtStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
