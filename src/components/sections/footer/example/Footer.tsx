"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Twitter, Linkedin, Github, Youtube, Mail, MapPin, Phone, ArrowRight, Instagram } from "lucide-react"
import Image from "next/image"



export default function Footer() {
  return (
   
     <footer className=" text-white md:h-[30rem] h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-5">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Image 
                                          src='/zaby-white.svg' 
                                          alt='logo' 
                                          width={ 140} 
                                          height={140}
                                          className="transition-all duration-500 w-18 h-auto" 
                                      />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-driven, cross-generational learning ecosystem designed to personalize and optimize skill acquisition
              through our proprietary PRISM Framework.
            </p>
            <div className="flex space-x-3">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://x.com/ZabyAi123', '_blank')}
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://www.linkedin.com/company/zaby-ai/', '_blank')}
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button
              size="icon"
              variant="ghost"
              className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={()=>window.open("https://www.instagram.com/zaby.tech/",'_blank')}
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full cursor-pointer h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={()=>window.open("https://youtube.com/@genzaby?si=2q3z-hEwlhKxkzDz",'_blank')}
              >
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <h3 className="md:text-sm  font-semibold text-gray-100 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/business" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="/creators" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Creators  
                  </Link>
                </li>
                <li>
                  <Link href="/workflow" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    WorkFlow
                  </Link>
                </li>
                <li>
                  <Link href="/products/interview" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Zaby Interview
                  </Link>
                </li>
                <li>
                  <Link href="/products/cert-prep" className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-2">
                    Zaby Prep
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
               
            </h3>
            {/* <p className="text-gray-300 text-sm">
              Get the latest updates on AI learning research and product announcements.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
              />
              <Button className="bg-purple-500 hover:bg-purple-700 cursor-pointer">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div> */}
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 ">
              <li className="flex items-start space-x-3  ">
                <div className=' flex space-x-3 '>
                <Mail className="h-5 w-5 text-white/50 mt-0.5" />
                <span className="text-gray-300">hello@zaby.io</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className=' flex space-x-3 '>
                <MapPin className="h-5 w-15 text-white/50 mt-0.5" />
                <span className="text-gray-300"> Plot No.25, Srujana, Lakshmi Nagar Colony, Ameenpur, Ramachandrapuram, Medak- 502032, Gachibowli, Telangana, India</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
<div className=' flex space-x-3 '>
                <Phone className="h-5 w-5 text-white/50 mt-0.5" />
                <span className="text-gray-300">+91-8523871114 </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

            <div className="mt-10 md:pt-8 border-t border-gray-800">
        <div className="flex md:flex-row items-center justify-center md:justify-start space-x-3 md:space-x-6 mb-4">
          <Image
            src="/iso-9001.png"
            alt="ISO 9001 Certification"
            width={150}
            height={30}
            className="mt-4 md:mt-0 md:w-22 h-15 md:h-22 w-15 cursor-pointer"
            onClick={() => window.open('https://www.iafcertsearch.org/certification/CBGrJHgQD06uUl9n4SzLujlK','_blank')}
            />
            <Image
            src="/iso-27001.png"
            alt="ISO 27001 Certification"
            width={150}
            height={30}
            className="mt-4 md:mt-0 md:h-22 h-15 md:w-22 w-15 cursor-pointer"
            onClick={() => window.open('https://www.iafcertsearch.org/certification/NSfA7vSho5dy4E9oDojNiXbX','_blank')}

            />

            </div>

        <div className=" flex flex-col md:flex-row justify-between items-center mb-4">

          <p className="text-sm text-gray-400">© 2025 GEN ZABY AI SOLUTIONS PRIVATE LIMITED</p>

          <div className="flex space-x-6 mt-4 md:mt-0 pb-1">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termsandcondition" className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-2 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-2 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
            </div>
      <BackgroundBeams />
    </footer>
   
  );
}



