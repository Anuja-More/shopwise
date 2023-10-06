"use client";
import { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "@/lib/actions/index";

const isValidAamazonProductURL = (url :string) =>{
try {
const parsedURL = new URL(url);
const hostname =  parsedURL.hostname;
// check if hostname conatin amzon or amazone.com
if(hostname.includes('amazon.com') || 
hostname.includes('amazon.') ||
hostname.includes('amazon')
) {
    return true;
}
}catch(error){
return false;
}
}

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const isValidLink = isValidAamazonProductURL(searchPrompt);
    if(!isValidLink) return alert('Please provide a vaild Amazon link')
    try{
     setIsLoading(true);
     //scrape the product
     const product = await scrapeAndStoreProduct(searchPrompt)
    }catch(error){
        console.log(error)
    }finally{
        setIsLoading(false)
    }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12'
     onSubmit={handleSubmit}>
     <input value={searchPrompt} type="text" 
     placeholder="Enter product link"
      className="searchbar-input"
      onChange={(e)=> setSearchPrompt(e.target.value)}
      />
      <button type="submit" 
      className="searchbar-btn"
      disabled = {searchPrompt === ''}
      >
       {isLoading ? 'Searching...' : 'Search'}
      </button>
    
    </form>
  )
}

export default SearchBar;