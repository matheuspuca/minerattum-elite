import { motion } from "framer-motion";

const techLogos = [
  { name: "Vale", width: "w-20" },
  { name: "CSN", width: "w-16" },
  { name: "Gerdau", width: "w-20" },
  { name: "Usiminas", width: "w-24" },
  { name: "Anglo American", width: "w-28" },
];

export const TrustBanner = () => {
  return (
    <section className="relative py-16 md:py-20 bg-card/50 border-y border-border/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções desenvolvidas com <span className="text-foreground font-medium">tecnologia de ponta</span> para alta performance em campo.
          </p>
        </motion.div>

        {/* Placeholder for partner logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {techLogos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className={`${logo.width} h-8 flex items-center justify-center`}
            >
              <div className="text-muted-foreground/40 font-semibold text-sm tracking-wide hover:text-muted-foreground transition-colors cursor-pointer">
                {logo.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
