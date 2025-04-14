import { servicesClientData } from "../../data/servicesClientData";
import ServiceOptionButton from "./ServiceOptionButton";
import ServiceTypeButton from "./ServiceTypeButton";

export default function ServiceSelection({
  selectedService,
  onServiceSelect,
  selectedOptions,
  onOptionSelect,
}) {
  const handleServiceSelect = (service) => {
    onServiceSelect(service);
    onOptionSelect([]);
  };

  const handleOptionToggle = (option) => {
    onOptionSelect((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold mb-4 text-whiteAmber">Type de projet</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {servicesClientData.map((service, index) => (
            <ServiceTypeButton
              key={index}
              service={service}
              isSelected={selectedService?.title === service.title}
              onSelect={handleServiceSelect}
            />
          ))}
        </div>
      </div>

      {/* Services spécifiques */}
      {selectedService && (
        <div className="flex flex-col gap-4 mt-8">
          <h3 className="text-xl font-semibold mb-4 text-whiteAmber">Services disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedService.services.map((service, index) => (
              <ServiceOptionButton
                key={index}
                service={service}
                isSelected={selectedOptions.includes(service)}
                onToggle={handleOptionToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
