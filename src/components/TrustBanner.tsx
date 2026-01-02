import { motion } from "framer-motion";

export const TrustBanner = () => {
  return (
    <section className="relative py-16 md:py-20 bg-card/50 border-y border-border/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções desenvolvidas com <span className="text-foreground font-medium">tecnologia de ponta</span> para alta performance em campo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
