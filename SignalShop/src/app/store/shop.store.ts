import {signalStore, withComputed, withState} from "@ngrx/signals";
import { initialShopSlice } from "./shop.slice";
import { computed } from "@angular/core";
import { buildCartVm, buildProductListVm } from "./shop.vm.builder";

export const ShopStore = signalStore(
    {providedIn: "root"},
    withState(initialShopSlice),
    withComputed(store => ({
        productListVm: computed(() => buildProductListVm(store.products(), store.searchWord(), store.cartQuantities())),
        cartVm: computed(() => buildCartVm(store.products(), store.cartQuantities(), store.taxRate(), store.cartVisible()))
    }))
);