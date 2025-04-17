import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterBox() {
  return (
    <section className="flex justify-center items-center py-6 md:py-8 ">
      <div
        className="bg-[url('/images/pattern.png')]   bg-cover  text-white md:rounded-lg p-6 w-full max-w-2xl lg:max-w-3xl"
        dir="rtl"
      >
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative flex items-center gap-2 text-2xl w-fit  bg-white/80   rounded-xl px-4 py-2 pt-3  text-black">
            <Search className="h-6 w-6 " />
            <p>تلاش</p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 w-full gap-4">
            {/* Department Select */}
            <Select>
              <SelectTrigger className="bg-neutral-200 text-black w-full  rounded-full px-4 py-2 text-right">
                <SelectValue placeholder="شعبہ منتخب کریں" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiqh">فقہ</SelectItem>
                <SelectItem value="aqeedah">عقیدہ</SelectItem>
                <SelectItem value="social">سماجی</SelectItem>
              </SelectContent>
            </Select>
            {/*  */}
            <Select>
              <SelectTrigger className="bg-neutral-200 text-black w-full rounded-full px-4 py-2 text-right">
                <SelectValue placeholder="شعبہ منتخب کریں" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiqh">فقہ</SelectItem>
                <SelectItem value="aqeedah">عقیدہ</SelectItem>
                <SelectItem value="social">سماجی</SelectItem>
              </SelectContent>
            </Select>

            {/* Scholar Select */}
            <Select>
              <SelectTrigger className="bg-neutral-200 text-black w-full  rounded-full px-4 py-2 text-right">
                <SelectValue placeholder="عالم منتخب کریں" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mufti1">مفتی احمد</SelectItem>
                <SelectItem value="mufti2">مفتی نعیم</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Select */}
            <Select>
              <SelectTrigger className="bg-neutral-200 text-black w-full rounded-full px-4 py-2 text-right">
                <SelectValue placeholder="زمرہ منتخب کریں" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ibadat">عبادات</SelectItem>
                <SelectItem value="muamlaat">معاملات</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-4">
            <Button className="bg-primary hover:bg-teal-700 text-white rounded-full px-6 py-2">
              تلاش کریں
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
