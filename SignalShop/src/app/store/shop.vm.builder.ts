import {Product} from "../models/product.model";
import { ProductListVm } from "./shop.vm";

export function buildProductListVm(products: Product[], searchWord: string, quantities: Record<string, number>): ProductListVm {

    return {
        productItems: buildProductItems()
    };

    function buildProductItems() {
        const word = searchWord.trim().toLowerCase();

        return products
        .filter(product => product.name.toLowerCase().includes(word))
        .map(product => ({
            ...product,
            quantity: quantities[product.id] || 0
        }));
    }
}

export function buildCartVm(products: Product[], quantities: Record<string, number>, taxRate: number, cartVisible: boolean ) {

    const items = buildCartItems();
    const subTotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subTotal * taxRate;
    const total = subTotal + tax;
    const itemsCount = items.length;
    const isActive = itemsCount > 0;
    const isVisible = cartVisible;    

    return {
        items: items,
        subTotal,
        tax,
        total,
        itemsCount,
        isActive,
        isVisible        
    };
    function buildCartItems() {
        return products.filter(product => quantities[product.id])
        .map(product => {
            const quantity = quantities[product.id];

            return {
                id: product.id,
                name: product.name,
                price: product.unitPrice,
                quantity: quantity,
                total: product.unitPrice * quantity
            }
        });
    }
}