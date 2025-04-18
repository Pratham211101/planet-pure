import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: 'sale',
    title: 'Sale',
    type: 'document',
    icon:TagIcon,
    fields: [
        defineField({
            name:"title",
            title:"sale title",
            type:"string",
        }),
        defineField({
            name:"description",
            title:"sale description",
            type:"text",
        }),
        defineField({
            name:"discountAmount",
            title:"discount amount",
            type:"number",
            description:"amount off in percentage or fixed value"
        }),
        defineField({
            name:"couponCode",
            title:"coupon code",
            type:"string",
        }),
        defineField({
            name:"validFrom",
            title:"valid from",
            type:"datetime",
        }),
        defineField({
            name:"validUntil",
            title:"valid until",
            type:"datetime",
        }),
        defineField({
            name:"isActive",
            title:"is active",
            type:"boolean",
            description:"Toggle to activate/deactivate sale",
            initialValue:true
        }),
    ],
    preview:{
        select:{
            title:"title",
            discountAmount:"discountAmount",
            couponCode:"couponCode",
            isActive:"isActive"
        },
        prepare(select){
            const {title,discountAmount,couponCode,isActive} = select;
            const status = isActive ? "Active" : "Inactive";
            return{
                title,
                subtitle:`Discount: ${discountAmount}% off - Code ${couponCode} - ${status}`
            }
        }

    }
})