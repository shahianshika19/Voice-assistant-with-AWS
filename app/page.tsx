"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Brain, MessageCircle, Zap, ArrowRight } from 'lucide-react';
import CountUp from 'react-countup';

const AnimatedTitle = () => {
  const words = "Your Custom Support Vala Assistant".split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-[8rem] pt-[2rem] cursor-default"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="flex h-[10rem] flex-wrap justify-center gap-x-4 gap-y-4 text-5xl md:text-6xl font-bold">
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={child}
            className="inline-block h-[10rem]"
          >
            <motion.span
              className="h-[10rem] inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
              whileHover={{
                scale: 1.1,
                rotate: [-1, 1, -1, 1, 0],
                transition: {
                  duration: 0.3,
                  rotate: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.5
                  }
                }
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: idx * 0.2
                }
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        ))}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-screen h-[1px] mb-[1rem] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        animate={{
          scaleX: [1, 0, 1],
          x: ["-100%", "0%", "100%"],
        }} 
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stats = [
  { value: 99, label: "Accuracy", suffix: "%" },
  { value: 24, label: "Support", suffix: "/7" },
  { value: 50000, label: "Potential Users", suffix: "+" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedTitle />
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Harness the power of AI to understand your customers like never before
          </motion.p>
          <motion.div 
            className="space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button asChild size="lg" className="group">
              <Link href="/sentiment-analysis">
                Try Sentiment Analysis
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/chatbot">Chat with our Bot</Link>
            </Button>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <CountUp end={stat.value} duration={2.5} separator="," />
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Features Carousel */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent>
              {[
                {
                  title: "Sentiment Analysis",
                  description: "Get instant insights into customer feedback",
                  icon: Brain
                },
                {
                  title: "AI Chatbot",
                  description: "24/7 intelligent customer support",
                  icon: MessageCircle
                },
                {
                  title: "Easy Integration",
                  description: "Seamless API integration with your systems",
                  icon: Zap
                }
              ].map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    className="h-full p-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <feature.icon className="w-12 h-12 text-primary mb-4" />
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Experience the power of AI with our advanced {feature.title.toLowerCase()} solutions.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription>Join thousands of satisfied users today</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="mt-4">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}